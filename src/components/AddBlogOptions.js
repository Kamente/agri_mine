import React, { useState, useEffect, useRef } from "react";
import "./Homepage.css";

function AddBlogOptions({ onClose, onAddBlog }) {
    const [blogData, setBlogData] = useState({
        title: "",
        author: "",
        description: "",
        category: "Agriculture",
    });

    const [isSubmitted, setIsSubmitted] = useState(false);

    const overlayRef = useRef();

    useEffect(() => {
        function handleClickOutside(event) {
            if (overlayRef.current && !overlayRef.current.contains(event.target)) {
                onClose();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBlogData({
            ...blogData,
            [name]: value,
        });
    };

    const handleSubmit = () => {
        if (!blogData.title || !blogData.author || !blogData.description || !blogData.category) {
            alert("Please fill in all mandatory fields");
            return;
        }

        fetch("https://agri-blogs.onrender.com/blogs", {
            method: "POST",
            body: JSON.stringify(blogData),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (response.status === 201) {
                    console.log("Data sent to the API successfully");
                    onClose();
                    alert("Thanks for submitting!");
                } else {
                    console.error("Error sending data to the API. Status: " + response.status);
                }
            })
            .catch((error) => {
                console.error("Error sending data to the API:", error);
            });
    };

    return (
        <div className="overlay" ref={overlayRef}>
            <div className="add-blog-content">
                <h2>Add a New Blog</h2>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={blogData.title}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Author:</label>
                    <input
                        type="text"
                        name="author"
                        value={blogData.author}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={blogData.description}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Category:</label>
                    <select
                        name="category"
                        value={blogData.category}
                        onChange={handleInputChange}
                    >
                        <option value="Agriculture">Agriculture</option>
                        <option value="Farming">Farming</option>
                        <option value="Livestock">Livestock</option>
                        <option value="Horticulture">Horticulture</option>
                    </select>
                </div>
                {isSubmitted ? (
                    <div className="submission-message">
                        Thanks for submitting!
                    </div>
                ) : (
                    <div className="submission-buttons">
                        <button onClick={handleSubmit}>Submit</button>
                        <button onClick={onClose}>Cancel</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AddBlogOptions;
