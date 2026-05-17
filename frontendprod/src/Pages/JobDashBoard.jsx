// import React, { useContext, useEffect, useState } from "react";
// import { context } from "../App";
// import axios from "axios";
// import JobCard from "../Components/JobCard";

// const JobDashBoard = () => {
//   const { res } = useContext(context);
//   const [loading, setLoading] = useState(false);
//   const [aiLoading, setAiLoading] = useState(false);
//   const [jobRole, setJobRole] = useState(null);
//   const [jobs, setJobs] = useState([]);
//   const [error, setError] = useState(null);

//   // Fetch AI-recommended job role from Gemini
//   useEffect(() => {
//     const fetchAI = async () => {
//       setAiLoading(true);
//       setError(null);

//       if (!res) {
//         setError("No resume data found");
//         setAiLoading(false);
//         return;
//       }

//       const url =
//         "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

//       const apiKey = "AIzaSyDYwqX56pGCWDO6xfbHg8XKNcX6m1gi4hI";

//       const data = {
//         contents: [
//           {
//             parts: [
//               {
//                 text: `${JSON.stringify(
//                   res
//                 )} this is the stringify version of the Resume. Based on all this, suggest what should be the job role. Give me ONLY the role in 1-3 words, nothing else. Format: just the role name (e.g., "Software Engineer" or "Data Scientist" or "Frontend Developer")`,
//               },
//             ],
//           },
//         ],
//       };

//       const headers = {
//         "Content-Type": "application/json",
//         "X-goog-api-key": apiKey,
//       };

//       try {
//         const response = await axios.post(url, data, { headers });
//         console.log("AI Response:", response.data);

//         if (
//           response.data &&
//           response.data.candidates &&
//           response.data.candidates[0]
//         ) {
//           const role = response.data.candidates[0].content.parts[0].text.trim();

//           // Clean up the role (remove quotes, extra spaces, etc.)
//           const cleanedRole = role.replace(/['"]/g, "").trim();

//           setJobRole(cleanedRole);
//           console.log("Recommended role:", cleanedRole);
//         } else {
//           throw new Error("Invalid response structure from AI API");
//         }
//       } catch (error) {
//         console.error("Error fetching AI result:", error);
//         setError("Failed to analyze resume with AI");
//         // Fallback role
//         setJobRole("Software Engineer");
//       } finally {
//         setAiLoading(false);
//       }
//     };

//     fetchAI();
//   }, [res]);

//   // Fetch jobs based on the AI-recommended role
//   useEffect(() => {
//     if (!jobRole) return;

//     const fetchJobs = async () => {
//       setLoading(true);
//       setError(null);

//       // Convert role to URL-friendly format (replace spaces with hyphens or %20)
//       const roleParam = jobRole.toLowerCase().replace(/\s+/g, "-");

//       const apiUrl = `http://localhost:8080/resume/job/${roleParam}`;

//       try {
//         console.log("Fetching jobs from:", apiUrl);
//         const response = await axios.get(apiUrl);

//         if (response.status === 200) {
//           console.log("Jobs response:", response.data);

//           // Handle different response formats
//           let jobsData = [];

//           if (Array.isArray(response.data)) {
//             jobsData = response.data;
//           } else if (response.data.jobs && Array.isArray(response.data.jobs)) {
//             jobsData = response.data.jobs;
//           } else if (response.data.data && Array.isArray(response.data.data)) {
//             jobsData = response.data.data;
//           } else {
//             console.warn("Unexpected response format:", response.data);
//           }

//           setJobs(jobsData);
//           console.log(`Loaded ${jobsData.length} jobs`);
//         } else {
//           throw new Error(`Request failed with status: ${response.status}`);
//         }
//       } catch (error) {
//         console.error("Error fetching jobs:", error);

//         if (error.response) {
//           // Server responded with error
//           setError(
//             `Failed to fetch jobs: ${
//               error.response.data?.message || error.response.statusText
//             }`
//           );
//         } else if (error.request) {
//           // Request made but no response
//           setError("Failed to fetch jobs: Server not responding");
//         } else {
//           // Something else happened
//           setError(`Failed to fetch jobs: ${error.message}`);
//         }

//         setJobs([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchJobs();
//   }, [jobRole]);

//   // Error state
//   if (error) {
//     return (
//       <div className="max-w-7xl mx-auto p-4">
//         <div className="p-4 text-red-800 bg-red-100 rounded-lg border border-red-300">
//           <strong className="font-semibold">Error: </strong>
//           <span>{error}</span>
//         </div>
//         {jobRole && (
//           <div className="mt-4 p-3 bg-gray-100 text-gray-700 rounded-lg">
//             <strong>Recommended Role:</strong> {jobRole}
//           </div>
//         )}
//       </div>
//     );
//   }

//   // Loading state
//   if (aiLoading || loading) {
//     return (
//       <div className="max-w-7xl mx-auto p-4">
//         <div className="flex flex-col justify-center items-center p-8 min-h-[400px]">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
//           <span className="ml-3 mt-4 text-gray-700 font-medium">
//             {aiLoading
//               ? "Analyzing your resume..."
//               : "Loading job recommendations..."}
//           </span>
//         </div>
//       </div>
//     );
//   }

//   // Main render
//   return (
//     <div className="max-w-7xl mx-auto p-4">
//       {/* AI Recommended Role Banner */}
//       {jobRole && (
//         <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg shadow-sm">
//           <div className="flex items-center justify-between">
//             <div>
//               <span className="text-sm text-blue-600 font-semibold uppercase tracking-wide">
//                 AI Recommended Role
//               </span>
//               <h2 className="text-2xl font-bold text-blue-900 mt-1">
//                 {jobRole}
//               </h2>
//             </div>
//             <div className="text-sm text-blue-600">
//               {jobs.length} {jobs.length === 1 ? "job" : "jobs"} found
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Jobs Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {jobs.length > 0 ? (
//           jobs.map((job, index) => (
//             <JobCard
//               key={index}
//               name={
//                 job.position || job.job_position || "Position not specified"
//               }
//               company={
//                 job.company || job.company_name || "Company not specified"
//               }
//               location={
//                 job.location || job.job_location || "Location not specified"
//               }
//               logo={job.companyLogo || job.company_logo_url || ""}
//               url={job.jobUrl || job.job_link || "#"}
//               salary={job.salary}
//               date={job.date}
//               agoTime={job.agoTime}
//             />
//           ))
//         ) : (
//           <div className="col-span-full text-center py-12">
//             <div className="text-gray-400 mb-4">
//               <svg
//                 className="mx-auto h-12 w-12"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                 />
//               </svg>
//             </div>
//             <h3 className="text-lg font-medium text-gray-900 mb-2">
//               No jobs found
//             </h3>
//             <p className="text-gray-500">
//               No jobs found for the recommended role: <strong>{jobRole}</strong>
//             </p>
//             <p className="text-sm text-gray-400 mt-2">
//               Try updating your resume or check back later for new
//               opportunities.
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default JobDashBoard;






import React, { useContext, useEffect, useState } from "react";
import { context } from "../App";
import axios from "axios";
import JobCard from "../Components/JobCard";

const JobDashBoard = () => {
  const { res } = useContext(context);
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [jobRole, setJobRole] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);

  // Fetch AI-recommended job role from Gemini
  useEffect(() => {
    // const fetchAI = async () => {
    //   setAiLoading(true);
    //   setError(null);

    //   if (!res) {
    //     setError("No resume data found");
    //     setAiLoading(false);
    //     return;
    //   }

    //   const url =
    //     "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

    //   const apiKey = "AIzaSyBb0yhoZMT8rFxOKjZbbdusmYQSf2rrjUo";

    //   const data = {
    //     contents: [
    //       {
    //         parts: [
    //           {
    //             text: `${JSON.stringify(
    //               res,
    //             )} this is the stringify version of the Resume. Based on all this, suggest what should be the job role. Give me ONLY the role in 1-3 words, nothing else. Format: just the role name (e.g., "Software Engineer" or "Data Scientist" or "Frontend Developer")`,
    //           },
    //         ],
    //       },
    //     ],
    //   };

    //   const headers = {
    //     "Content-Type": "application/json",
    //     "X-goog-api-key": apiKey,
    //   };

    //   try {
    //     const response = await axios.post(url, data, { headers });
    //     console.log("AI Response:", response.data);

    //     if (
    //       response.data &&
    //       response.data.candidates &&
    //       response.data.candidates[0]
    //     ) {
    //       const role = response.data.candidates[0].content.parts[0].text.trim();

    //       // Clean up the role (remove quotes, extra spaces, etc.)
    //       const cleanedRole = role.replace(/['"]/g, "").trim();

    //       setJobRole(cleanedRole);
    //       console.log("Recommended role:", cleanedRole);
    //     } else {
    //       throw new Error("Invalid response structure from AI API");
    //     }
    //   } catch (error) {
    //     console.error("Error fetching AI result:", error);
    //     setError("Failed to analyze resume with AI");
    //     // Fallback role
    //     setJobRole("Software Engineer");
    //   } finally {
    //     setAiLoading(false);
    //   }
    // };

    // fetchAI();
    setJobRole("Software Engineer");
  }, [res]);

  // Fetch jobs based on the AI-recommended role
  useEffect(() => {
    if (!jobRole) return;

    const fetchJobs = async () => {
      setLoading(true);
      setError(null);

      // Convert role to URL-friendly format (replace spaces with hyphens or %20)
      const roleParam = jobRole.toLowerCase().replace(/\s+/g, "-");

      const apiUrl = `http://localhost:8080/resume/job/${roleParam}`;

      try {
        console.log("Fetching jobs from:", apiUrl);
        const response = await axios.get(apiUrl);

        if (response.status === 200) {
          console.log("Jobs response:", response.data);

          // Handle different response formats
          let jobsData = [];

          if (Array.isArray(response.data)) {
            jobsData = response.data;
          } else if (response.data.jobs && Array.isArray(response.data.jobs)) {
            jobsData = response.data.jobs;
          } else if (response.data.data && Array.isArray(response.data.data)) {
            jobsData = response.data.data;
          } else {
            console.warn("Unexpected response format:", response.data);
          }

          setJobs(jobsData);
          console.log(`Loaded ${jobsData.length} jobs`);
        } else {
          throw new Error(`Request failed with status: ${response.status}`);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);

        if (error.response) {
          // Server responded with error
          setError(
            `Failed to fetch jobs: ${
              error.response.data?.message || error.response.statusText
            }`,
          );
        } else if (error.request) {
          // Request made but no response
          setError("Failed to fetch jobs: Server not responding");
        } else {
          // Something else happened
          setError(`Failed to fetch jobs: ${error.message}`);
        }

        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [jobRole]);

  // Error state
  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-4">
        <div className="p-4 text-red-800 bg-red-100 rounded-lg border border-red-300">
          <strong className="font-semibold">Error: </strong>
          <span>{error}</span>
        </div>
        {jobRole && (
          <div className="mt-4 p-3 bg-gray-100 text-gray-700 rounded-lg">
            <strong>Recommended Role:</strong> {jobRole}
          </div>
        )}
      </div>
    );
  }

  // Loading state
  if (aiLoading || loading) {
    return (
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex flex-col justify-center items-center p-8 min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <span className="ml-3 mt-4 text-gray-700 font-medium">
            {aiLoading
              ? "Analyzing your resume..."
              : "Loading job recommendations..."}
          </span>
        </div>
      </div>
    );
  }

  // Main render
  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* AI Recommended Role Banner */}
      {jobRole && (
        <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-blue-600 font-semibold uppercase tracking-wide">
                AI Recommended Role
              </span>
              <h2 className="text-2xl font-bold text-blue-900 mt-1">
                {jobRole}
              </h2>
            </div>
            <div className="text-sm text-blue-600">
              {jobs.length} {jobs.length === 1 ? "job" : "jobs"} found
            </div>
          </div>
        </div>
      )}

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.length > 0 ? (
          jobs.map((job, index) => (
            <JobCard
              key={index}
              name={
                job.position || job.job_position || "Position not specified"
              }
              company={
                job.company || job.company_name || "Company not specified"
              }
              location={
                job.location || job.job_location || "Location not specified"
              }
              logo={job.companyLogo || job.company_logo_url || ""}
              url={job.jobUrl || job.job_link || "#"}
              salary={job.salary}
              date={job.date}
              agoTime={job.agoTime}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg
                className="mx-auto h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No jobs found
            </h3>
            <p className="text-gray-500">
              No jobs found for the recommended role: <strong>{jobRole}</strong>
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Try updating your resume or check back later for new
              opportunities.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDashBoard;