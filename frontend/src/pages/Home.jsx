import { useEffect, useState } from "react";
import api from "../api";
import Note from "../components/Note";
import '../styles/Home.css';

const Home = () => {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = () => {
        api.get("/api/notes/")
            .then((res) => {
                setNotes(res.data);
                console.log(res.data);})
            .catch((err) => console.log(err));
    }

    const deleteNote = (id) => {
        api.delete(`/api/notes/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) console.log("Note deleted!"); 
                else console.log("Failed to delete note.");
                getNotes();
            })
            .catch((err) => console.log(err));
    }

    const createNote = (e) => {
        e.preventDefault();
        api.post('/api/notes/', { content, title })
            .then((res) => {
                if (res.status === 201) console.log("Note created!");
                else console.log("Failed to make note.");
                getNotes();
            })
            .catch((err) => console.log(err));
    }

    return (
        <div>
            <div>
                <h2>Notes</h2>
                {notes.map((note) => 
                    <Note note={note} 
                            onDelete={() => deleteNote(note.id)} 
                            key={note.id}
                    />
                )}
            </div>
            <h2>Create a Note</h2>
            <form onSubmit={createNote}>
                <label htmlFor="title">Title:</label>
                <br/>
                <input type="text" 
                        id="title"
                        name="title"
                        value={title}
                        required 
                        onChange={(e) => setTitle(e.target.value)} 
                />
                <label htmlFor="content">Content:</label>
                <br/>
                <textarea placeholder="Content"
                            id="content"
                            name="content"
                            value={content} 
                            required
                            onChange={(e) => setContent(e.target.value)} />
                <input type="submit" value="Submit"></input>
            </form>
        </div>
    );
}

export default Home;