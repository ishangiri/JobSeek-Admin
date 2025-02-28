import { ScrollArea } from "@/components/ui/scroll-area";
import ApplicantCard from "./ApplicantCard";
import ApplicantTable from "./ApplicantTable";

const ApplicantsList = ({ applicants, selectedJobId, isDarkTheme, openResume, onStatusChange, openCalendar}) => {
  const styles = {
    secondaryTextColor: isDarkTheme ? "text-gray-300" : "text-gray-600",
  };

  return (
    <ScrollArea className="flex-1 p-4 lg:p-6">
      {selectedJobId ? (
        <div className="overflow-x-auto">
          {/* Mobile View - Card Layout */}
          <div className="lg:hidden space-y-4">
            {applicants.map((applicant) => (
              <ApplicantCard
                key={applicant.applicantId}
                applicant={applicant}
                isDarkTheme={isDarkTheme}
                openResume={openResume}
                onStatusChange={onStatusChange}
                openCalendar={openCalendar}
              />
            ))}
            {applicants.length === 0 && (
              <div className={`text-center py-8 ${styles.secondaryTextColor}`}>
                No applicants found for this job
              </div>
            )}
          </div>

          {/* Desktop View - Table Layout */}
          <div className="hidden lg:block">
            <ApplicantTable
              applicants={applicants}
              isDarkTheme={isDarkTheme}
              openResume={openResume}
              onStatusChange={onStatusChange}
              openCalendar={openCalendar}
            />
          </div>
        </div>
      ) : (
        <div className={`flex items-center justify-center h-full ${styles.secondaryTextColor}`}>
          Select a job from the left to view applicants
        </div>
      )}
    </ScrollArea>
  );
};

export default ApplicantsList;