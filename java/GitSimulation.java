import java.io.*;

public class GitSimulation {
    public static void main(String[] args) {
        String inputFileName = "input.txt"; // Input file with commands
        String outputFileName = "output.txt"; // Output file to write results

        try (BufferedReader reader = new BufferedReader(new FileReader(inputFileName));
             PrintStream fileOut = new PrintStream(new FileOutputStream(outputFileName, true))) { // true to append

            System.setOut(fileOut); // Redirect System.out to output.txt
            
            RepositoryManager repo = new RepositoryManager();
            GitCommandFactory factory = new GitCommandFactory(repo);
            String line;

            while ((line = reader.readLine()) != null) {
                String[] parts = line.split("\\s+", 3); // Split command and arguments
                String command = parts[0];
                
                GitCommand gitCommand = null;
                
                switch (command) {
                    case "commit":
                        if (parts.length >= 3) { // Ensure there are enough arguments for commit
                            String message = parts[1];
                            String data = parts[2];
                            gitCommand = factory.createCommand(command, message, data);
                            System.out.println("Executing commit command");
                        } else {
                            System.out.println("Error: 'commit' command requires a message and data");
                        }
                        break;
                    case "log":
                        gitCommand = factory.createCommand(command);
                        System.out.println("Executing log command");
                        break;
                    case "checkout":
                        if (parts.length >= 2) { // Ensure there is an argument for checkout
                            String commitId = parts[1];
                            gitCommand = factory.createCommand(command, commitId);
                            System.out.println("Executing checkout command");
                        } else {
                            System.out.println("Error: 'checkout' command requires a commit ID");
                        }
                        break;
                    default:
                        System.out.println("Unknown command: " + command);
                        continue;
                }

                if (gitCommand != null) {
                    // Execute the command and capture any output to append to the file
                    gitCommand.execute();
                }
            }

            // Decorator pattern example
            Commit commit = new Commit("Decorator test commit", "Data2");
            Commit importantCommit = new ImportantCommitDecorator(commit);
            Commit taggedCommit = new TaggedCommitDecorator(commit, "v1.0");

            System.out.println("Important Commit: " + importantCommit);
            System.out.println("Tagged Commit: " + taggedCommit);

        } catch (IOException e) {
            System.err.println("Error processing file: " + e.getMessage());
        }
    }
}
