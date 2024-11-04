'use client'
import { useState, useEffect } from 'react'
import { Bold, Italic, Underline, List, AlignLeft, AlignCenter, AlignRight } from 'lucide-react'

export default function TextEditor() {
  const [text, setText] = useState('')
  const [versions, setVersions] = useState([{ id: 1, timestamp: new Date().toISOString(), content: '' }])
  const [currentVersion, setCurrentVersion] = useState(1)

  const saveVersion = async () => {
    const newVersion = {
      id: versions.length + 1,
      timestamp: new Date().toISOString(), // Store timestamp as ISO string
      content: text
    }
    setVersions((prevVersions) => [...prevVersions, newVersion])
    setCurrentVersion(newVersion.id)

    // Prepare data to save in input.txt format
    const logEntry = `commit Version_${newVersion.id} ${text.replace(/\n/g, ' ')}\n`;

    // Send a request to the API to save the log entry
    try {
      const response = await fetch('/api/saveVersion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: logEntry }),
      });

      if (!response.ok) {
        throw new Error('Failed to save version');
      }

      console.log('Version saved successfully');
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const loadVersion = (id) => {
    const version = versions.find(v => v.id === id)
    if (version) {
      setText(version.content)
      setCurrentVersion(id)
    }
  }

  const formatText = (command) => {
    document.execCommand(command, false, null);
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r">
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Version History</h2>
          <div className="h-[calc(100vh-8rem)] overflow-y-auto">
            {versions.map((version) => (
              <button
                key={version.id}
                className={`w-full text-left mb-2 px-3 py-2 rounded ${
                  currentVersion === version.id ? 'bg-gray-200' : 'hover:bg-gray-100'
                }`}
                onClick={() => loadVersion(version.id)}
              >
                Version {version.id}
                <span className="ml-2 text-xs text-gray-500">
                  {new Date(version.timestamp).toLocaleString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false
                  })}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="bg-white border-b p-2 flex items-center space-x-2">
          <button className="p-1 hover:bg-gray-100 rounded" onClick={() => formatText('bold')}><Bold className="h-4 w-4" /></button>
          <button className="p-1 hover:bg-gray-100 rounded" onClick={() => formatText('italic')}><Italic className="h-4 w-4" /></button>
          <button className="p-1 hover:bg-gray-100 rounded" onClick={() => formatText('underline')}><Underline className="h-4 w-4" /></button>
          <button className="p-1 hover:bg-gray-100 rounded" onClick={() => formatText('insertUnorderedList')}><List className="h-4 w-4" /></button>
          <button className="p-1 hover:bg-gray-100 rounded" onClick={() => formatText('justifyLeft')}><AlignLeft className="h-4 w-4" /></button>
          <button className="p-1 hover:bg-gray-100 rounded" onClick={() => formatText('justifyCenter')}><AlignCenter className="h-4 w-4" /></button>
          <button className="p-1 hover:bg-gray-100 rounded" onClick={() => formatText('justifyRight')}><AlignRight className="h-4 w-4" /></button>
          <input
            type="text"
            className="max-w-sm ml-auto px-3 py-1 border rounded"
            placeholder="Document Title"
          />
          <button
            className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={saveVersion}
          >
            Save Version
          </button>
        </div>

        {/* Editor */}
        <div
          className="flex-1 p-4 text-lg resize-none border rounded"
          contentEditable
          suppressContentEditableWarning={true} // Prevent React warning
          onInput={(e) => setText(e.currentTarget.innerHTML)} // Capture the content
          dangerouslySetInnerHTML={{ __html: text }} // Set inner HTML for formatting
        />
      </div>
    </div>
  )
}
