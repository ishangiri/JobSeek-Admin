import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const JobCard = ({ job, isSelected, isDarkTheme, onClick }) => {
  const styles = {
    textColor: isDarkTheme ? "text-gray-200" : "text-gray-900",
    secondaryTextColor: isDarkTheme ? "text-gray-300" : "text-gray-600",
    cardBg: isDarkTheme ? "#4D4D4D" : "white",
    selectedCardBg: isDarkTheme ? "#606060" : "bg-blue-50",
    selectedBorderColor: isDarkTheme ? "border-black" : "border-slate-500",
    hoverBg: isDarkTheme ? "hover:bg-black-600" : "hover:bg-gray-50",
  };

  return (
    <Card
      onClick={onClick}
      className={`p-3 lg:p-4 cursor-pointer transition-colors ${styles.hoverBg} border-2
        ${isSelected ? `${styles.selectedCardBg} ${styles.selectedBorderColor}` : 'border-transparent'}`}
      style={{ backgroundColor: styles.cardBg }}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className={`font-semibold text-base lg:text-lg ${styles.textColor}`}>{job.position}</h3>
          <p className={styles.secondaryTextColor}>{job.company}</p>
          <div className="flex items-center gap-2 mt-1 lg:mt-2">
            <Badge variant={isDarkTheme ? "secondary" : "default"}>
              {job.jobType}
            </Badge>
            <span className={`text-xs lg:text-sm ${styles.secondaryTextColor}`}>
              {job.jobLocation}
            </span>
          </div>
        </div>
        <div className="text-right">
          <p className={`text-xl lg:text-2xl font-bold ${styles.textColor}`}>{job.applicants.length}</p>
          <p className={`text-xs lg:text-sm ${styles.secondaryTextColor}`}>Applicants</p>
        </div>
      </div>
    </Card>
  );
};

export default JobCard;