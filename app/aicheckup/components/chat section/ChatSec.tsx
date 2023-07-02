"use client";
import * as React from "react";
import { toast } from "react-hot-toast";
import DoctorCard from "../../../components/doctor/DoctorCard";

interface IChatSecProps {}

const ChatSec: React.FunctionComponent<IChatSecProps> = (props) => {
  const [selectedSymptoms, setSelectedSymtoms] = React.useState<string[]>([]);
  const [specialization, setSpecialization] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [finalList, setFinalList] = React.useState([]);

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
    for (let i = 0; i < responseFromPrisma.length; i++) {
      responseFromPrisma[i].image =
        "data:image/jpeg;base64,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";
    }
    setFinalList(responseFromPrisma);

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
        Specialist: {isLoading ? "Loading..." : specialization}
      </p>
      <div className="px-[300px] mt-10">
        {finalList.length > 0
          ? finalList.map((num: any) => (
              <DoctorCard
                key={num.id}
                name={num.name}
                specialization={num.specialization}
                fees={num.fees}
                rating={num.rating}
                image={num.image}
              />
            ))
          : null}
      </div>
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
