import './styles/Header.css';

export default function Header(props) {
  const { funcs, isPreviewMode } = props;

  const loadExample = () => {
    funcs.loadExample();
  };

  const toggleView = () => {
    if (!isPreviewMode) {
      funcs.loadPreview();
    } else {
      funcs.loadEditor();
    }
  };

  const exportPDF = () => {
    funcs.exportPDF();
  };

  return (
    <header className="header">
      <div className="header--container">
        <div className="header__title-container">
          <h1 className="header__title">Simple CV Builder</h1>
          <h2 className="header__sub-title">
            Created by{' '}
            <a href="https://github.com/JE-Richards" className="link">
              JE Richards
            </a>
          </h2>
        </div>
        <div className="header__btns-container">
          <button type="button" className="header__btn" onClick={loadExample}>
            Fill Example CV
          </button>
          <button type="button" className="header__btn" onClick={toggleView}>
            {isPreviewMode ? 'View editor' : 'View preview'}
          </button>
          <button
            type="button"
            className="header__btn header__btn--alt"
            onClick={exportPDF}
          >
            Export PDF
          </button>
        </div>
      </div>
    </header>
  );
}
