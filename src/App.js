import { DndProvider } from 'react-dnd';
import Card from './Card';
import Deck from './Deck';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div
        style={{
          display: 'flex',
        }}
      >
        {/* <div
          style={{
            width: 600,
            height: 1200,
            backgroundColor: 'grey',
          }}
        >
          <Card />
        </div> */}
        <Deck />
      </div>
    </DndProvider>
  );
}

export default App;
