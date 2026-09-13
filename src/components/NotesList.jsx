function NotesList() {
  return (
    <section className="border-r border-gray-200 p-5">
      <header className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Notes</h2>

        <button className="text-sm font-medium">
          + New Page
        </button>
      </header>

      <div className="h-[80%] flex items-center justify-center text-gray-500 text-sm">
        Select a folder to view your pages.
      </div>
    </section>
  );
}

export default NotesList;