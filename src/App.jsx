import Title from './components/Title';
import DraftEditor from './components/DraftEditor';

const App = () => {

  return (
    <div className="w-screen h-screen p-6 pt-14">
      <Title />
      <DraftEditor />
      <div className="mt-4 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-sm font-semibold text-gray-700 mb-2">Formatting Guide:</h2>
        <ul className="list-disc ml-5 text-sm text-gray-600">
          <li>Type # and press space for heading format</li>
          <li>Type * and press space for bold text</li>
          <li>Type ** and press space for red text</li>
          <li>Type *** and press space for underlined text</li>
        </ul>
      </div>
    </div>
  );
};

export default App;