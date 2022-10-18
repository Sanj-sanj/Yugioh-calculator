type DISPLAY_DATA = {
  currentLP: number;
  duelistName: string;
  id: number;
  className: string;
};

const DuelDisplay = ({
  currentLP,
  duelistName,
  id,
  className,
}: DISPLAY_DATA) => {
  return (
    <div className={`duel-display-container ${className}`}>
      <div className="duel-display">
        <div className="duel-display-name">{duelistName}</div>
        <div className="life-bar">
          <div>{currentLP}</div>
        </div>
      </div>
      <div className="display-interact">
        <button>+</button>
        <button>-</button>
      </div>
    </div>
  );
};
export default DuelDisplay;
