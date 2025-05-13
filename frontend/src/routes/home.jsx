import "./Root.css";

export default function Home() {
  return (
    <div id="content">
      <section className="about-section">
        <h2>nel & ev</h2>
        <p>
          We met in the most unexpected way and have been inseparable ever
          since. Our journey has taken us from late-night takeout and deep chats
          to planning a lifetime together — and now we can’t wait to celebrate
          it with you!
        </p>
        <p>
          We love hiking, cooking, and dancing badly in the living room. This
          wedding is not just a celebration of our love, but of everyone who's
          been part of our story.
        </p>
        <p>[Thank you @chatgpt - to do]</p>
      </section>

      <section className="gallery-section">
        <h2>Gallery</h2>
        <p>
          We're putting together a collection of our favorite memories. Check
          back soon!
        </p>
        <div className="gallery-placeholder">
          <p>[Gallery Coming Soon]</p>
        </div>
      </section>
    </div>
  );
}
