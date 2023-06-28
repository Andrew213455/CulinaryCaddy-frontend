import { useContext, useEffect, useState } from "react";
import "./Notes.css";
import Note from "../models/Note";
import AuthContext from "../context/AuthContext";
import {
  deleteNote,
  getAllNotes,
  getNoteById,
} from "../services/noteApiService";
import { useNavigate } from "react-router-dom";

const Notes = () => {
  const [allNotes, setAllNotes] = useState<Note[]>([]);
  const { account } = useContext(AuthContext);
  const [trigger, setTrigger] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getAllNotes(account?._id!).then((res) => {
      setAllNotes(res);
      return res;
    });
  }, [trigger]);

  return (
    <section className="Notes">
      <div className="notes-container">
        <h2>All Notes</h2>
        {allNotes.map((item) => {
          return (
            <div className="note-card-box">
              <div className="title">
                <h3 className="note-card">{item.title}</h3>

                <button onClick={() => navigate(`/${item.recipeId}`)}>
                  Go to Recipe
                </button>
                <i
                  className="fa-solid fa-trash trash"
                  onClick={() => {
                    getNoteById(account?._id!, item._id!).then(() => {
                      deleteNote(item._id!).then((res) => {
                        setTrigger((prev) => !prev);
                        return res;
                      });
                    });
                  }}
                ></i>
              </div>

              <p>{item.note}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Notes;
