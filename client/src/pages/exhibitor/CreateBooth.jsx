import "./CreateBooth.css";

export default function CreateBooth() {
  return (
    <div className="create-booth">

      {/* HEADER */}
      <div className="booth-header">
        <h1>
          🚀 Create <span>Booth</span>
        </h1>
        <p>
          Build your premium exhibitor booth and showcase it in the EventSphere expo system.
        </p>
      </div>

      {/* GRID */}
      <div className="booth-grid">

        {/* FORM CARD */}
        <div className="premium-card">

          <h2 className="form-title">Booth Details</h2>

          <div className="form-grid">

            <div className="form-group">
              <label>Booth Name</label>
              <input type="text" placeholder="Enter booth name" />
            </div>

            <div className="form-group">
              <label>Category</label>
              <select>
                <option>Technology</option>
                <option>Design</option>
                <option>Business</option>
                <option>Healthcare</option>
                <option>Environment</option>
              </select>
            </div>

            <div className="form-group full">
              <label>Description</label>
              <textarea placeholder="Describe your booth..." />
            </div>

            <div className="form-group">
              <label>Location</label>
              <input type="text" placeholder="Hall A" />
            </div>

            <div className="form-group">
              <label>Contact Email</label>
              <input type="email" placeholder="example@mail.com" />
            </div>

          </div>

          <button className="create-btn">
            🚀 Create Booth
          </button>

        </div>

        {/* PREVIEW CARD */}
        <div className="premium-card preview-card">

          <div className="preview-banner">
            <span className="preview-badge">Live Preview</span>
          </div>

          <h3 className="preview-title">Your Booth Preview</h3>

          <p className="preview-desc">
            This preview updates how your booth will appear in the expo system.
          </p>

          <div className="preview-info">

            <div className="preview-box">
              <h4>Category</h4>
              <p>Technology</p>
            </div>

            <div className="preview-box">
              <h4>Location</h4>
              <p>Hall A</p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}