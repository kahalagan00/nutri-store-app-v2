// Default page for routes that doesn't exist
function PageNotFound() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <h1 className="text-8xl">Page Does Not Exist 🛑</h1>
    </div>
  );
}

export default PageNotFound;
