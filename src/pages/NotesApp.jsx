import Sidebar from "../components/Sidebar";
import NotesList from "../components/NotesList";
import Editor from "../components/Editor";

export default function NotesApp() {
  return (
    <main className="grid grid-cols-[240px_300px_1fr] h-screen">
      <Sidebar />
      <NotesList />
      <Editor />
    </main>
  );
}