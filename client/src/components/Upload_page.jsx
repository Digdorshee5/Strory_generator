import React, { useState } from 'react';
import axios from 'axios';

function UploadPage() {
    const [imageUrl, setImageUrl] = useState('');
    const [result, setResult] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setImageUrl(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setResult('');
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:8080/remove-background', {
                imageUrl
            });

            if (response.data && response.data.output_url) {
                setResult(response.data.output_url);
            } else {
                setError('Failed to process the image.');
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Something went wrong.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <h2 style={{ backgroundColor: 'pink', color: 'black', fontSize: '40px' }}>
                Background Remover
            </h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter image URL"
                    value={imageUrl}
                    onChange={handleChange}
                    style={{ fontSize: '20px', width: '80%', padding: '10px', margin: '20px 0' }}
                />
                <button
                    type="submit"
                    style={{
                        fontSize: '32px',
                        textAlign: 'center',
                        backgroundColor: 'rgb(25, 219, 34)',
                        padding: '10px 20px',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s ease'
                    }}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = 'rgb(20, 179, 30)')}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = 'rgb(25, 219, 34)')}
                >
                    Submit
                </button>
            </form>

            {loading && <p>Loading...</p>}

            {error && (
                <div style={{ color: 'red', marginTop: '20px' }}>
                    <strong>Error:</strong> {error}
                </div>
            )}

            {result && (
                <div style={{ marginTop: '20px' }}>
                    <h3>Result:</h3>
                    <img src={result} alt="Processed" style={{ maxWidth: '100%' }} />
                </div>
            )}
        </div>
    );
}

export default UploadPage;
