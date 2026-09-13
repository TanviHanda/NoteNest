function Sidebar() {
  return (
    <aside className="border-r border-gray-200 p-5">
      <h1 className="text-xl font-bold mb-8">NoteNest</h1>

      <nav className="space-y-2">
        <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100">
          All Notes
        </button>

        <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100">
          Favorites
        </button>

        <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100">
          Trash
        </button>
      </nav>

      <div className="mt-8">
        <h2 className="text-sm font-semibold text-gray-500 mb-3">
          Folders
        </h2>

        <button className="text-sm font-medium">
          + New Folder
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;