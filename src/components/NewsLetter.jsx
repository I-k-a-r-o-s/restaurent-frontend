const NewsLetter = () => {
  return (
    <footer className="footer footer-horizontal footer-center bg-primary text-primary-content p-10">
      <form>
        <h1 className="footer-title font-bold">Subscribe to Our Newsletter</h1>
        <fieldset className="w-80">
          <label>Get The Latest News!</label>
          <div className="join mt-4">
            <input
              type="text"
              placeholder="Enter your Email"
              className="input input-bordered join-item text-info"
            />
            <button className="btn btn-accent join-item">Subscribe</button>
          </div>
        </fieldset>
      </form>
    </footer>
  );
};
export default NewsLetter;
