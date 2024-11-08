import { useState } from "react";


interface Form {
  phone: number;
  location: {
    latitude: number;
    longitude: number;
  };
  numOfPeople: number;
  typeOfAid: string[];
  description: string;
  image: string | null;
}

const initialForm: Form = {
  phone: 0,
  location: {
    latitude: 0,
    longitude: 0,
  },
  numOfPeople: 0,
  typeOfAid: [],
  description: "",
  image: null,
};

function Victim() {
  const [message, setMessage] = useState<string>("");
  const aids = ["Food", "Water", "Medicine", "Shelter", "Clothes", "Evacuation"];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(form);
    const response = await fetch("/submit-victim", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    if (response.ok) {
      setMessage(
        "Your post have been submitted, please wait for the rescue team to come"
      );
    } else {
      setMessage("There is an error, please try again later");
    }
  };

  const [form, setForm] = useState(initialForm);
  return (
    <div>
      <h1>Enter your details</h1>
      <form action="submit" onSubmit={handleSubmit}>
        <label htmlFor="phone">Phone</label>
        <input
          type="number"
          id="phone"
          onChange={(e) =>
            setForm({ ...form, phone: parseInt(e.target.value) })
          }
        />
        <br />
        {/* <label htmlFor="latitude">Latitude</label>
        <input
          type="number"
          id="latitude"
          onChange={(e) =>
            setForm({
              ...form,
              location: { ...form.location, latitude: parseInt(e.target.value) },
            })
          }
        />
        <br />
        <label htmlFor="longitude">Longitude</label>
        <input
          type="number"
          id="longitude"
          onChange={(e) =>
            setForm({
              ...form,
              location: {
                ...form.location,
                longitude: parseInt(e.target.value),
              },
            })
          }
        /> 
        <br /> */}
        <label htmlFor="numOfPeople">Number of people</label>
        <input
          type="number"
          id="numOfPeople"
          min={1}
          max={25}
          onChange={(e) =>
            setForm({ ...form, numOfPeople: parseInt(e.target.value) })
          }
        />
        <br />
        <label htmlFor="typeOfAid">Type of aid</label>
        <select
          id="typeOfAid"
          multiple
          onChange={(e) =>
            setForm({
              ...form,
              typeOfAid: Array.from(e.target.selectedOptions, (option) => option.value),
            })
          }
        >
          {aids.map((aid) => (
            <option key={aid} value={aid}>
              {aid}
            </option>
          ))}
        </select>
        <br />
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />
        <br />
        <label htmlFor="image">Image</label>
        <input
          type="file"
          id="image"
          onChange={(e) =>
            setForm({ ...form, image: URL.createObjectURL(e.target.files![0]) })
          }
        />
        <br />
        <button type="submit">Submit</button>
      </form>

      <p>{message}</p>
    </div>
  );
}

export default Victim;
