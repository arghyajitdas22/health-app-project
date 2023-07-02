"use client";
import * as React from "react";
import { toast } from "react-hot-toast";

interface IChatSecProps {}

const ChatSec: React.FunctionComponent<IChatSecProps> = (props) => {
  const [selectedSymptoms, setSelectedSymtoms] = React.useState<string[]>([]);
  const [specialization, setSpecialization] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleClick = (symptom: string) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymtoms(selectedSymptoms.filter((item) => item != symptom));
    } else {
      setSelectedSymtoms([...selectedSymptoms, symptom]);
    }
  };

  const handleSend = async () => {
    let newString =
      "Can you please give me an one word answer of which specialist doctor i should refer to according to my symptoms which are";
    if (selectedSymptoms.length === 0) {
      setSpecialization("No Symptoms selected");
      return;
    }

    for (let index = 0; index < selectedSymptoms.length; index++) {
      newString += selectedSymptoms[index];
    }
    console.log(newString);

    setIsLoading(true);

    const response = await fetch("/api/generate-answer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: newString,
      }),
    }).then((response) => response.json());
    console.log("Rsponse form chat gpt", response.text);
    const responseFromPrisma = await fetch("/api/doctors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        specialization: response.text,
      }),
    }).then((response) => response.json());
    console.log("ResponseFromPrisma", responseFromPrisma);

    setSpecialization(response.text);
    setIsLoading(false);
  };

  return (
    <>
      <div className="pl-[220px] mt-10 grid grid-cols-3 gap-x-3 gap-y-5">
        {symptoms.map((symptom) => (
          <div key={symptom} className="flex gap-1 items-center">
            <input
              type="checkbox"
              id={symptom}
              value={symptom}
              className="cursor-pointer w-4 h-4 rounded-md"
              onClick={() => handleClick(symptom)}
            />
            <label htmlFor={symptom}>{symptom}</label>
          </div>
        ))}

        <button
          disabled={isLoading}
          onClick={handleSend}
          className="w-[100px] h-[32px] bg-[#458ff6] rounded-[3.4375rem] text-center text-[#fff] text-[14px] font-medium"
        >
          Consult({selectedSymptoms.length})
        </button>
      </div>
      <p className="text-[#0e0e0e] font-semibold text-[20px] mt-10 px-20">
        Answer: {isLoading ? "Loading..." : specialization}
      </p>
    </>
  );
};

const symptoms = [
  " Headache",
  " Fatigue",
  " Cough",
  " Sore throat",
  " Fever",
  " Runny or stuffy nose",
  " Nausea",
  " Vomiting",
  " Diarrhea",
  " Muscle aches",
  " Joint pain",
  " Skin rash",
  " Shortness of breath",
  " Chest pain",
  " Dizziness",
  " Constipation",
  " Abdominal pain",
  " Back pain",
  " Swelling or edema",
  " Changes in appetite",
  " Frequent urination",
  " Excessive thirst",
  " Vision problems",
  " Memory loss",
  " Difficulty sleeping",
  " Chest tightness",
  " Unexplained weight loss",
  " Itchy or watery eyes",
  " Mood swings",
  " Hair loss",
];

export default ChatSec;
