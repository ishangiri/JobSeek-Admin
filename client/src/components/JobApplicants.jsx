
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { useDashboardContext } from "../pages/DashboardLayout";
import JobsList from  "../components/ViewApplicants/JobList";
import ApplicantsList from "../components/ViewApplicants/ApplicantsList";


const JobsApplicantsUI = ({ jobs, applicants, selectedJobId, setSelectedJobId, handleStatusChange }) => {
  const { isDarkTheme } = useDashboardContext();

  const openResume = (resume) => {
    window.open(resume, '_blank');
  };




  const selectedJob = jobs.find(job => job._id === selectedJobId);

  const styles = {
    backgroundColor: isDarkTheme ? "#4D4D4D" : "white",
    borderColor: isDarkTheme ? "border-gray-600" : "border-gray-200",
  };

  return (
    <div className={`flex flex-col lg:flex-row ${isDarkTheme ? "bg-[#4D4D4D]" : "bg-gray-50"}`}>
      {/* Left Sidebar - Jobs List */}
      <div className={`w-full lg:w-1/3 border-r ${styles.borderColor}`} style={{ backgroundColor: styles.backgroundColor }}>
        <JobsList
          jobs={jobs}
          selectedJobId={selectedJobId}
          setSelectedJobId={setSelectedJobId}
          isDarkTheme={isDarkTheme}
        />
      </div>

      {/* Right Content Area - Applicants */}
      <div className="flex-1 flex flex-col" style={{ backgroundColor: styles.backgroundColor }}>
        {/* Header */}
        <header className={`border-b ${styles.borderColor} p-4 lg:p-6`}>
          <div className="flex justify-between items-center">
            <h1 className={`text-xl lg:text-2xl font-bold ${isDarkTheme ? "text-gray-200" : "text-gray-900"}`}>
              {selectedJobId
                ? `Applicants for "${selectedJob?.position}"`
                : 'Select a job to view applicants'}
            </h1>
            <Button asChild variant={isDarkTheme ? "secondary" : "default"} className="hidden lg:inline-flex">
              <Link to="../">New Job Post</Link>
            </Button>
          </div>
        </header>

        {/* Applicants List/Table */}
        <ApplicantsList
          applicants={applicants}
          selectedJobId={selectedJobId}
          selectedJob={selectedJob}
          isDarkTheme={isDarkTheme}
          openResume={openResume}
          onStatusChange={handleStatusChange}
        />
      </div>
    </div>
  );
};

export default JobsApplicantsUI;