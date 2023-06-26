import { useContext, useEffect, useState } from "react";
import "./Notes.css";
import Note from "../models/Note";
import AuthContext from "../context/AuthContext";
import { getAllNotes } from "../services/noteApiService";
import { useNavigate } from "react-router-dom";

const Notes = () => {
  const [allNotes, setAllNotes] = useState<Note[]>([]);
  const { account } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    getAllNotes(account?._id!).then((res) => {
      setAllNotes(res);
      return res;
    });
  }, []);

  return (
    <section className="Notes">
      <div>
        {allNotes.map((item) => {
          return (
            <div>
              <p className="note-card">
                {item.title}: {item.note}
              </p>
              <button onClick={() => navigate(`/${item.recipeId}`)}>
                Go to Recipe
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Notes;
