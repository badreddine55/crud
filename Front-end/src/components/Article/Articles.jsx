import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


export default function Articles() {
    const [form, setForm] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/Articles');
                console.log(response.data.articles);
                setForm(response.data.articles);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const deleteArticle = async (articleId) => {
        try {
            await axios.delete(`http://localhost:8000/api/Article/${articleId}`);
            setForm(prevForm => prevForm.filter(article => article.id !== articleId));
        } catch (error) {
            console.error('Error deleting article:', error);
        }
    };


    return (
        <div className="row my-5">
            <div className="col-md-12 card">
                <div className="card-body">
                    <div className="row my-5">
                        {form.map((article,index) => (
                            <div className="col-md-4 mb-4" key={index}>
                                <div className="card" style={{ width: '18rem' }}>
                                    <div className="card-body">
                                        <img src={'http://localhost:8000/storage/'+article.image} alt='' style={{ width: '15rem' }}/>
                                        <h5 className="card-title">{article.title}</h5>
                                        <h6 className="card-subtitle mb-2 text-muted">{article.body}</h6>
                                        <div className="d-flex">
                                            <Link to={`/edit/${article.id}`} style={{
                                                border: 'none',
                                                color: '#fff',
                                                backgroundImage: 'linear-gradient(30deg, #33FFFC, #33FFE0)', // Adjust gradient colors
                                                borderRadius: '20px',
                                                backgroundSize: '100% auto',
                                                fontFamily: 'inherit',
                                                fontSize: '17px',
                                                padding: '0.6em 1.5em',
                                                marginRight: '10px' // Add margin to create space between buttons
                                            }} className="btn btn-sm btn-warning">
                                                Edit
                                            </Link>
                                            <button
                                                style={{
                                                    border: 'none',
                                                    color: '#fff',
                                                    backgroundImage: 'linear-gradient(30deg, #FF3333, #fdd55b)', // Adjust gradient colors
                                                    borderRadius: '20px',
                                                    backgroundSize: '100% auto',
                                                    fontFamily: 'inherit',
                                                    fontSize: '17px',
                                                    padding: '0.6em 1.5em',
                                                }}
                                                onClick={() => deleteArticle(article.id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    
                </div>
            </div>

        </div>
    );

}
