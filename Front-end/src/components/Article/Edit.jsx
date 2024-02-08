import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function EditArticle() {
    const [form, setForm] = useState({
        title: '',
        body: '',
        image: ''
    });
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { articleId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/Article/${articleId}`);
                setForm(response.data.article);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, [articleId])
    const formSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData();
            for (const key in form) {
                formData.append(key, form[key]);
            }
            await axios.put(`http://localhost:8000/api/Update/${articleId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setLoading(false);
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your article has been updated',
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/');
        } catch (error) {
            setLoading(false);
            setErrors(error);
        }
    }

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setForm((prevForm) => ({
                ...prevForm,
                image: file, 
            }));
        }
    };

    const renderErrors = (field) => (
        errors?.[field]?.map((error, index) => (
            <div key={index} className="text-white my-2 rounded p-2 bg-danger">
                {error}
            </div>
        ))
    )

    return (
        <div className="row my-5">
            <div className="col-md-6 mx-auto">
                <div className="card">
                    <div className="card-header bg-white">
                        <h5 className="text-center mt-2">
                            Edit Product
                        </h5>
                    </div>
                    <div className="card-body">
                        <form className="mt-5" onSubmit={formSubmit} encType="multipart/form-data">
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Name prodact</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={form.title}
                                    onChange={(e) => setForm((prevForm) => ({ ...prevForm, title: e.target.value }))}                                    className="form-control"
                                    placeholder="Name" />
                                {renderErrors('title')}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="body" className="form-label">Description</label>
                                <textarea
                                    className="form-control"
                                    name="body"
                                    value={form.body}
                                    onChange={(e) => setForm((prevForm) => ({ ...prevForm, body: e.target.value }))}                                    placeholder="Description"
                                    rows="3"></textarea>
                                {renderErrors('body')}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="image" className="form-label">Description</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    name="image"
                                    onChange={handlePhotoChange}
                                    rows="3"></input>
                                {renderErrors('body')}
                            </div>
                            <div className="mb-3">
                                {
                                    loading ?
                                        <div className="spinner-border" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                        :
                                        <button
                                            type="submit"
                                            style={{
                                                border: 'none',
                                                color: '#fff',
                                                backgroundImage: 'linear-gradient(30deg, #FF3333, #fdd55b)', // Adjust gradient colors
                                                borderRadius: '20px',
                                                backgroundSize: '100% auto',
                                                fontFamily: 'inherit',
                                                fontSize: '17px',
                                                padding: '0.6em 1.5em',
                                            }}>
                                            Update
                                        </button>

                                }
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
