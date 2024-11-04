import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

export async function POST(request) {
  const { data } = await request.json();

  const filePath = path.join(process.cwd(), 'java', 'input.txt');

  return new Promise((resolve) => {
    fs.appendFile(filePath, data + '\n', (err) => {
      if (err) {
        console.error('Error writing to file', err);
        return resolve(new Response(JSON.stringify({ error: 'Failed to save data' }), { status: 500 }));
      }

      const javaFilePath = path.join(process.cwd(), 'java', 'GitSimulation.java');
      const className = path.basename(javaFilePath, '.java'); // Get the class name

      // Check if the compiled class file exists
      const classFilePath = path.join(process.cwd(), 'java', `${className}.class`);

      if (!fs.existsSync(classFilePath)) {
        // Compile if the .class file does not exist
        exec(`javac "${javaFilePath}"`, (error, stdout, stderr) => {
          if (error) {
            console.error('Error compiling Java program', stderr);
            return resolve(new Response(JSON.stringify({ error: 'Failed to compile GitSimulation.java' }), { status: 500 }));
          }
          runJavaProgram(resolve, className, javaFilePath); // Pass javaFilePath to runJavaProgram
        });
      } else {
        // Directly run the Java program if the .class file exists
        runJavaProgram(resolve, className, javaFilePath);
      }
    });
  });
}

function runJavaProgram(resolve, className, javaFilePath) {
  exec(`java -cp "${path.dirname(javaFilePath)}" ${className}`, (error, stdout, stderr) => {
    if (error) {
      console.error('Error executing Java program', stderr);
      return resolve(new Response(JSON.stringify({ error: 'Failed to run GitSimulation.java' }), { status: 500 }));
    }

    console.log('Java program output:', stdout);
    return resolve(new Response(JSON.stringify({ message: 'Data saved and Java program executed successfully' }), { status: 200 }));
  });
}
