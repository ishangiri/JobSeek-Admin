import { ScrollArea } from "@/components/ui/scroll-area";
import JobCard from "./JobCard";

const JobsList = ({ jobs, selectedJobId, setSelectedJobId, isDarkTheme }) => {
  return (
    <ScrollArea className="h-[40vh] lg:h-[85vh] p-4 lg:p-6">
      <h2 className={`text-xl lg:text-2xl font-bold mb-4 lg:mb-6 ${isDarkTheme ? "text-gray-200" : "text-gray-900"}`}>Job Postings</h2>
      <div className="space-y-3 lg:space-y-4">
        {jobs.map((job) => (
          <JobCard
            key={job._id}
            job={job}
            isSelected={selectedJobId === job._id}
            isDarkTheme={isDarkTheme}
            onClick={() => setSelectedJobId(job._id)}
          />
        ))}
      </div>
    </ScrollArea>
  );
};

export default JobsList;