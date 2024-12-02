import React, { useState } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { marked } from 'marked';

function Chat_gpt() {
    const [prompt, setPrompt] = useState('');
    const [story, setStory] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setPrompt(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setStory('');
        setLoading(true);

        try {
            const response = await axios.post('https://strory-generator.onrender.com/api/generate-chat', { prompt });
            if (response.data && response.data.story) {
                const htmlStory = marked(response.data.story);
                setStory(htmlStory);
            } else {
                setError('Failed to generate story.');
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Something went wrong.');
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(story);
        alert('Story copied to clipboard!');
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'linear-gradient(to bottom, #121212, #1d1d1d)',
            color: '#fff',
            padding: '20px'
        }}>
            <h1 style={{
                color: '#f0f0f0',
                fontSize: '48px',
                marginBottom: '20px',
                textShadow: '0 4px 8px rgba(255, 255, 255, 0.2)'
            }}>
                Story Generator
            </h1>

            <form onSubmit={handleSubmit} style={{
                backgroundColor: '#1e1e1e',
                padding: '30px',
                borderRadius: '12px',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.5)',
                textAlign: 'center',
                width: '80%',
                maxWidth: '600px'
            }}>
                <textarea
                    placeholder="Enter your prompt here..."
                    value={prompt}
                    onChange={handleChange}
                    rows="4"
                    cols="50"
                    onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSubmit(e)}
                    style={{
                        width: '100%',
                        padding: '15px',
                        borderRadius: '8px',
                        border: 'none',
                        outline: 'none',
                        marginBottom: '20px',
                        fontSize: '18px',
                        backgroundColor: '#2a2a2a',
                        color: '#fff',
                        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5)'
                    }}
                />
                <button
                    type="submit"
                    style={{
                        backgroundColor: '#00b894',
                        color: '#fff',
                        fontSize: '20px',
                        padding: '12px 30px',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 8px 15px rgba(0, 184, 148, 0.4)'
                    }}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = '#00cec9')}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = '#00b894')}
                >
                    {loading ? 'Generating...' : 'Generate'}
                </button>
            </form>

            {error && (
                <div style={{
                    color: '#ff7675',
                    marginTop: '20px',
                    backgroundColor: '#2d2d2d',
                    padding: '15px',
                    borderRadius: '8px',
                    textAlign: 'center',
                    maxWidth: '600px'
                }}>
                    <strong>Error:</strong> {error}
                </div>
            )}

            {story && (
                <div style={{
                    marginTop: '20px',
                    backgroundColor: '#2b2b2b',
                    padding: '20px',
                    borderRadius: '12px',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.7)',
                    maxWidth: '600px',
                    width: '80%'
                }}>
                    <h3 style={{
                        color: '#00cec9',
                        fontSize: '24px',
                        marginBottom: '15px'
                    }}>
                        Generated Story:
                    </h3>
                    <ReactQuill
                        value={story}
                        readOnly={true}
                        theme="bubble"
                        style={{
                            backgroundColor: '#2b2b2b',
                            color: '#dfe6e9',
                            borderRadius: '8px'
                        }}
                        modules={{
                            toolbar: false // Hide toolbar for read-only mode
                        }}
                    />
                    <button
                        onClick={handleCopy}
                        style={{
                            marginTop: '20px',
                            backgroundColor: '#0984e3',
                            color: '#fff',
                            fontSize: '18px',
                            padding: '10px 20px',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = '#74b9ff')}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = '#0984e3')}
                    >
                        Copy Story
                    </button>
                </div>
            )}
        </div>
    );
}

export default Chat_gpt;
