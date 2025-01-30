import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ApplicantCard = ({ applicant, isDarkTheme, openResume }) => {
  const styles = {
    textColor: isDarkTheme ? "text-gray-200" : "text-gray-900",
    secondaryTextColor: isDarkTheme ? "text-gray-300" : "text-gray-600",
    cardBg: isDarkTheme ? "#4D4D4D" : "white",
  };

  return (
    <Card className="p-4" style={{ backgroundColor: styles.cardBg }}>
      <div className="flex items-center gap-4 mb-3">
        <Avatar className="w-12 h-12">
          <AvatarImage src={`https://i.pravatar.cc/150?u=${applicant.email}`} />
          <AvatarFallback>{applicant.name}</AvatarFallback>
        </Avatar>
        <div>
          <p className={`font-medium ${styles.textColor}`}>{applicant.name}</p>
          <p className={styles.secondaryTextColor}>{applicant.location || 'N/A'}</p>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <Badge variant={isDarkTheme ? "secondary" : "outline"}>
          {applicant.status}
        </Badge>
        <Button 
          variant={isDarkTheme ? "secondary" : "default"}
          size="sm"
          onClick={() => openResume(applicant.resume)} 
        >
          {applicant.resume ? 'View Resume' : 'No Resume'}
        </Button>
      </div>
    </Card>
  );
};

export default ApplicantCard;