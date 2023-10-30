import React, { useState } from "react";
import './Homepage.css';
import Cultural from '../images/Cultural.png';
import Backimg from '../images/back-img.jpg';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faFacebook, faTwitter, faInstagram, faLinkedIn } from "@fortawesome/free-brands-svg-icons";
import AddBlogOptions from "./AddBlogOptions"; // Import the AddBlogOptions component


function HomePage() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const [searchText, setSearchText] = useState("");
    const itemsPerPage = 3;

    const blogPosts = [
        { title: "Blog 1", author: "Author 1", description: "Agricultural blog", category: "Agriculture" },
        { title: "Blog 2", author: "Author 2", description: "Farming blog", category: "Farming" },
        { title: "Blog 3", author: "Author 3", description: "Livestock blog", category: "Livestock" },
        { title: "Blog 4", author: "Author 4", description: "Horticulture blog", category: "Horticulture" },
        { title: "Blog 5", author: "Author 5", description: "Farming blog", category: "Farming" },
        { title: "Blog 6", author: "Author 6", description: "Livestock blog", category: "Livestock" },
        { title: "Blog 7", author: "Author 2", description: "Agricultural blog", category: "Agriculture" },
        { title: "Blog 8", author: "Author 2", description: "Farming blog", category: "Farming" },
    ];

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setCurrentPage(1);
    };
    const handleSearch = (event) => {
        const text = event.target.value;
        setSearchText(text);
    };

    const visibleBlogs = blogPosts
        .filter(post => selectedCategory === "All" || post.category === selectedCategory)
        .filter(post => post.title.toLowerCase().includes(searchText.toLowerCase()));

    const totalPages = Math.ceil(visibleBlogs.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const visibleBlogsOnCurrentPage = visibleBlogs.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const [isAddBlogOpen, setIsAddBlogOpen] = useState(false); // State variable to manage the overlay

    const handleCreateBlogClick = () => {
        setIsAddBlogOpen(true); // Open the overlay when the "Create Blog/Post" link is clicked
    };

    return (
        <div>
            <nav className="custom-nav">
                <div className="content1">
                    <img className="custom-image" src={Cultural} alt="logo" /> <p className="custom-im-text">Find Agricultural Experts</p>
                    <div className="search-section">
                        <input className="custom-input" type="text" placeholder="Search Blog" value={searchText} onChange={handleSearch} />
                        <button className="custom-search">Search</button>
                    </div>
                    <li>
                        <button className="login"><Link to="/signup">Login/Signup</Link></button>
                    </li>
                </div>
            </nav>

            <div className="content2">
                <ul className="list2">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/">Blog/Post List</Link></li>
                    <li><Link to="/">Profile</Link></li>
                    <li>
                        <button className="login" onClick={handleCreateBlogClick}>Create Blog/Post</button>
                    </li>
                </ul>
            </div>

            {isAddBlogOpen && (
                <AddBlogOptions onClose={() => setIsAddBlogOpen(false)} />
            )}
            <div className="body-section">
                <div className="flex-for-body">
                    <div className="cards-section">
                        {visibleBlogsOnCurrentPage.map((post, index) => (
                            <div className="card" key={index}>
                                <h3>{post.title}</h3>
                                <h3>{post.author}</h3>
                                <p className="descr">{post.description}</p>
                                <button className="read-more">Read More</button>
                            </div>
                        ))}
                    </div>
                    <div className="pagination">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        {Array.from({ length: 1 }).map((_, index) => (
                            <button key={index} className={currentPage === index + 1 ? "active" : ""}>
                                {currentPage}
                            </button>
                        ))}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </div>
                <div className="filter-by">
                    <h3>Filter By:</h3>
                    <div className="radio-grid">
                        <label>
                            <input
                                type="radio"
                                name="category"
                                value="All"
                                checked={selectedCategory === "All"}
                                onChange={() => handleCategoryChange("All")}
                            />
                            All
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="category"
                                value="Agriculture"
                                checked={selectedCategory === "Agriculture"}
                                onChange={() => handleCategoryChange("Agriculture")}
                            />
                            Agriculture
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="category"
                                value="Farming"
                                checked={selectedCategory === "Farming"}
                                onChange={() => handleCategoryChange("Farming")}
                            />
                            Farming
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="category"
                                value="Livestock"
                                checked={selectedCategory === "Livestock"}
                                onChange={() => handleCategoryChange("Livestock")}
                            />
                            Livestock
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="category"
                                value="Horticulture"
                                checked={selectedCategory === "Horticulture"}
                                onChange={() => handleCategoryChange("Horticulture")}
                            />
                            Horticulture
                        </label>
                    </div>
                </div>
                <div className="back-img">
                    <img className="back-img" src={Backimg} alt="logo" />
                </div>
            </div>
            <footer className="footer">
                <div className="copyright">
                    <p>
                        <span style={{ fontSize: '22px' }}>&copy;</span> 2021 Revolutionizing
                    </p>
                    <p>Agriculture</p>
                </div>
                <div className="socials">
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                        {/* <FontAwesomeIcon icon={faFacebook} size="2x" /> */}
                    </a>
                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                        {/* <FontAwesomeIcon icon={faTwitter} size="2x" /> */}
                    </a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                        {/* <FontAwesomeIcon icon={faInstagram} size="2x" /> */}
                    </a>
                </div>
            </footer>
        </div>
    );
}

export default HomePage;



// import React, { useState, useEffect } from "react";
// import './Homepage.css';
// import Cultural from '../images/Cultural.png';
// import Backimg from '../images/back-img.jpg';
// import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faFacebook, faTwitter, faInstagram, faLinkedIn } from "@fortawesome/free-brands-svg-icons";
// import AddBlogOptions from "./AddBlogOptions"; // Import the AddBlogOptions component

// function HomePage() {
//     const [selectedCategory, setSelectedCategory] = useState("All");
//     const [currentPage, setCurrentPage] = useState(1);
//     const [searchText, setSearchText] = useState("");
//     const itemsPerPage = 3;
//     const [blogPosts, setBlogPosts] = useState([]); // State to store blog data

//     useEffect(() => {
//         // Fetch blog data from the API when the component loads
//         fetch("https://agri-blogs.onrender.com/blogs")
//             .then((response) => response.json())
//             .then((data) => {
//                 console.log("Fetched data:", data); // Log the fetched data
//                 // Update the state with the retrieved blog data
//                 setBlogPosts(data.blogs);
//             })
//             .catch((error) => {
//                 console.error("Error fetching blog data:", error);
//             });
//     }, []);
//     const handleCategoryChange = (category) => {
//         setSelectedCategory(category);
//         setCurrentPage(1);
//     };

//     const handleSearch = (event) => {
//         const text = event.target.value;
//         setSearchText(text);
//     };

//     const visibleBlogs = blogPosts
//         ? blogPosts
//             .filter(post => selectedCategory === "All" || post.category === selectedCategory)
//             .filter(post => post.title.toLowerCase().includes(searchText.toLowerCase()))
//         : [];


//     const totalPages = Math.ceil(visibleBlogs.length / itemsPerPage);

//     const handlePageChange = (pageNumber) => {
//         if (pageNumber >= 1 && pageNumber <= totalPages) {
//             setCurrentPage(pageNumber);
//         }
//     };

//     const visibleBlogsOnCurrentPage = visibleBlogs.slice(
//         (currentPage - 1) * itemsPerPage,
//         currentPage * itemsPerPage
//     );

//     const [isAddBlogOpen, setIsAddBlogOpen] = useState(false);

//     const handleCreateBlogClick = () => {
//         setIsAddBlogOpen(true);
//     };

//     return (
//         <div>
//             <nav className="custom-nav">
//                 <div className="content1">
//                     <img className="custom-image" src={Cultural} alt="logo" /> <p className="custom-im-text">Find Agricultural Experts</p>
//                     <div className="search-section">
//                         <input className="custom-input" type="text" placeholder="Search Blog" value={searchText} onChange={handleSearch} />
//                         <button className="custom-search">Search</button>
//                     </div>
//                     <li>
//                         <button className="login"><Link to="/signup">Login/Signup</Link></button>
//                     </li>
//                 </div>
//             </nav>

//             <div className="content2">
//                 <ul className="list2">
//                     <li><Link to="/">Home</Link></li>
//                     <li><Link to="/">Blog/Post List</Link></li>
//                     <li><Link to="/">Profile</Link></li>
//                     <li>
//                         <button className="login" onClick={handleCreateBlogClick}>Create Blog/Post</button>
//                     </li>
//                 </ul>
//             </div>

//             {isAddBlogOpen && (
//                 <AddBlogOptions onClose={() => setIsAddBlogOpen(false)} />
//             )}

//             <div className="body-section">
//                 <div className="flex-for-body">
//                     <div className="cards-section">
//                         {visibleBlogsOnCurrentPage.map((post) => (
//                             <div className="card" key={post.title}>
//                                 <h3>{post.title}</h3>
//                                 <h3>{post.author}</h3>
//                                 <p className="descr">{post.description}</p>
//                                 <button className="read-more">Read More</button>
//                             </div>
//                         ))}
//                     </div>

//                     <div className="pagination">
//                         <button
//                             onClick={() => handlePageChange(currentPage - 1)}
//                             disabled={currentPage === 1}
//                         >
//                             Previous
//                         </button>
//                         {Array.from({ length: totalPages }).map((_, index) => (
//                             <button key={index + 1} className={currentPage === index + 1 ? "active" : ""}>
//                                 {index + 1}
//                             </button>
//                         ))}
//                         <button
//                             onClick={() => handlePageChange(currentPage + 1)}
//                             disabled={currentPage === totalPages}
//                         >
//                             Next
//                         </button>
//                     </div>
//                 </div>
//                 <div className="filter-by">
//                     <h3>Filter By:</h3>
//                     <div className="radio-grid">
//                         <label>
//                             <input
//                                 type="radio"
//                                 name="category"
//                                 value="All"
//                                 checked={selectedCategory === "All"}
//                                 onChange={() => handleCategoryChange("All")}
//                             />
//                             All
//                         </label>
//                         <label>
//                             <input
//                                 type="radio"
//                                 name="category"
//                                 value="Agriculture"
//                                 checked={selectedCategory === "Agriculture"}
//                                 onChange={() => handleCategoryChange("Agriculture")}
//                             />
//                             Agriculture
//                         </label>
//                         <label>
//                             <input
//                                 type="radio"
//                                 name="category"
//                                 value="Farming"
//                                 checked={selectedCategory === "Farming"}
//                                 onChange={() => handleCategoryChange("Farming")}
//                             />
//                             Farming
//                         </label>
//                         <label>
//                             <input
//                                 type="radio"
//                                 name="category"
//                                 value="Livestock"
//                                 checked={selectedCategory === "Livestock"}
//                                 onChange={() => handleCategoryChange("Livestock")}
//                             />
//                             Livestock
//                         </label>
//                         <label>
//                             <input
//                                 type="radio"
//                                 name="category"
//                                 value="Horticulture"
//                                 checked={selectedCategory === "Horticulture"}
//                                 onChange={() => handleCategoryChange("Horticulture")}
//                             />
//                             Horticulture
//                         </label>
//                     </div>
//                 </div>
//                 <div className="back-img">
//                     <img className="back-img" src={Backimg} alt="logo" />
//                 </div>
//             </div>
//             <footer className="footer">
//                 <div className="copyright">
//                     <p>
//                         <span style={{ fontSize: '22px' }}>&copy;</span> 2021 Revolutionizing
//                     </p>
//                     <p>Agriculture</p>
//                 </div>
//                 <div className="socials">
//                     <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
//                         <FontAwesomeIcon icon={faFacebook} size="2x" />
//                     </a>
//                     <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
//                         <FontAwesomeIcon icon={faTwitter} size="2x" />
//                     </a>
//                     <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
//                         <FontAwesomeIcon icon={faInstagram} size="2x" />
//                     </a>
//                 </div>
//             </footer>
//         </div>
//     );
// }

// export default HomePage;