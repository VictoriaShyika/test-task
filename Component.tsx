import { useState } from "react";

export const StudentsDataComponent = memo(() => {
  const [studentsData, setStudentsData] = useState([]);
  const [schoolsData, setSchoolsData] = useState([]);
  const [legalguardiansData, setLegalguardiansData] = useState([]);

  const studentsDataArray = [];
  const onStudentsPick = async (studentIds) => {
    for (const studentId of studentIds) {
      const studentData = await fetchStudentData(studentId);
      studentsDataArray.push(studentData);
      setStudentsData([...studentsData, studentData]);
    }

    studentsDataArray.map(async (student) => {
      try {
        const { schoolId, legalguardianId } = student;
        const [schoolData, legalguardianData] = await Promise.all([...fetchSchoolData(schoolId), ...fetchLegalguardianData(legalguardianId)]);
  
        [schoolData, legalguardianData].map((item) => {
          const schoolsData = item.schoolData;
          const legalguardiansData  = item.legalguardianData;

          setSchoolsData(schoolsData);
          setLegalguardiansData(legalguardiansData);
        })
      } catch(error) {
        throw new Error(`${error}`);
      }  
    });
  };

  return (
    <>
      <StudentsPicker onPickHandler={onStudentsPick} />
      <StudentsTable
        studentsData={studentsData}
        schoolsData={schoolsData}
        LegalguardiansData={legalguardiansData}
      />
    </>
  );
});


StudentsDataComponent.displayName = 'StudentsDataComponent';