import { useState } from 'react';

import Select from './Select';
import { SelectOption } from './Select';

const options = [
  { label: "First", value: 1 },
  { label: "Second", value: 2 },
  { label: "Third", value: 3 },
  { label: "Fourth", value: 4 },
  { label: "Fiveth", value: 5 },
  { label: "Sixth", value: 6 },
  { label: "Seventh", value: 7 },
  { label: "Eighth", value: 8 }
];

function App() {
  const [value1, setValue1] = useState<SelectOption | undefined>(options[0]);
  const [value2, setValue2] = useState<SelectOption[]>([options[0]]);

  console.log('rendering App')

  return (
    <div className="App">
      <Select
        multiple
        options={options}
        value={value2}
        onChange={(o) => setValue2(o)}
      />
      <br />
      <Select
        options={options}
        value={value1}
        onChange={(o) => setValue1(o)}
      />
    </div>
  )
}

export default App;
