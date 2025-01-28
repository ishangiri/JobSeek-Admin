import { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDashboardContext } from "../pages/DashboardLayout";
import { Link } from 'react-router-dom';

const JobsApplicantsUI = ({ jobs, applicants, selectedJobId, setSelectedJobId }) => {


  const openResume = (resume) => {
   window.open(resume,  '_blank');
  }

  const selectedJob = jobs.find(job => job._id === selectedJobId);
  const { isDarkTheme } = useDashboardContext();

  // Theme-based styles
  const styles = {
    backgroundColor: isDarkTheme ? "#4D4D4D" : "white",
    textColor: isDarkTheme ? "text-gray-200" : "text-gray-900",
    secondaryTextColor: isDarkTheme ? "text-gray-300" : "text-gray-600",
    cardBg: isDarkTheme ? "#4D4D4D" : "white",
    selectedCardBg: isDarkTheme ? "#606060" : "bg-blue-50",
    borderColor: isDarkTheme ? "border-gray-600" : "border-gray-200",
    selectedBorderColor: isDarkTheme ? "border-black" : "border-slate-500",
    hoverBg: isDarkTheme ? "hover:bg-black-600" : "hover:bg-gray-50",
  };

  return (
    <div className={`flex flex-col  lg:flex-row ${isDarkTheme ? "bg-[#4D4D4D]" : "bg-gray-50"}`}>
      {/* Left Sidebar - Jobs List */}
      <div className={`w-full lg:w-1/3 border-r ${styles.borderColor}`} style={{ backgroundColor: styles.backgroundColor }}>
        <ScrollArea className="h-[40vh] lg:h-[85vh] p-4 lg:p-6">
          <h2 className={`text-xl lg:text-2xl font-bold mb-4 lg:mb-6 ${styles.textColor}`}>Job Postings</h2>
          <div className="space-y-3 lg:space-y-4">
            {jobs.map((job) => (
              <Card
                key={job._id}
                onClick={() => setSelectedJobId(job._id)}
                className={`p-3 lg:p-4 cursor-pointer transition-colors ${styles.hoverBg} border-2
                  ${selectedJobId === job._id 
                    ? `${styles.selectedCardBg} ${styles.selectedBorderColor}` 
                    : 'border-transparent'}`}
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
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Right Content Area - Applicants */}
      <div className="flex-1 flex flex-col" style={{ backgroundColor: styles.backgroundColor }}>
        {/* Header */}
        <header className={`border-b ${styles.borderColor} p-4 lg:p-6`}>
          <div className="flex justify-between items-center">
            <h1 className={`text-xl lg:text-2xl font-bold ${styles.textColor}`}>
              {selectedJobId
                ? `Applicants for "${selectedJob?.position}"`
                : 'Select a job to view applicants'}
            </h1>
            <Button asChild variant={isDarkTheme ? "secondary" : "default"} className="hidden lg:inline-flex"
                
            >
          <Link to = {`../`} > New Job Post </Link>
            </Button>
          </div>
        </header>

        {/* Applicants List/Table */}
        <ScrollArea className="flex-1 p-4 lg:p-6">
          {selectedJobId ? (
            <div className="overflow-x-auto">
              {/* Mobile View - Card Layout */}
              <div className="lg:hidden space-y-4">
                {applicants.map((applicant) => (
                  <Card 
                    key={applicant.applicantId} 
                    className="p-4"
                    style={{ backgroundColor: styles.cardBg }}
                  >
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
                        onClick = {() => openResume(applicant.resume)} 
                      >
                        {applicant.resume ? 'View Resume' : 'No Resume'}
                      </Button>
                    </div>
                  </Card>
                ))}
                {applicants.length === 0 && (
                  <div className={`text-center py-8 ${styles.secondaryTextColor}`}>
                    No applicants found for this job
                  </div>
                )}
              </div>

              {/* Desktop View - Table Layout */}
              <div className="hidden lg:block">
                <Table>
                  <TableHeader>
                    <TableRow className={styles.borderColor}>
                      <TableHead className={styles.textColor}>Candidate</TableHead>
                      <TableHead className={styles.textColor}>Status</TableHead>
                      <TableHead className={styles.textColor}>Location</TableHead>
                      <TableHead className={styles.textColor}>Resume</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {applicants.map((applicant) => (
                      <TableRow key={applicant.applicantId} className={styles.borderColor}>
                        <TableCell>
                          <div className="flex items-center gap-4">
                            <Avatar className="w-10 h-10">
                              <AvatarImage src={`https://i.pravatar.cc/150?u=${applicant.email}`} />
                              <AvatarFallback>{applicant.name}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className={`font-medium ${styles.textColor}`}>{applicant.name}</p>
                              <p className = "text-xs" >{applicant.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={isDarkTheme ? "secondary" : "outline"}>
                            {applicant.status}
                          </Badge>
                        </TableCell>
                        <TableCell className={styles.textColor}>{applicant.location || 'N/A'}</TableCell>
                        <TableCell>
                          <Button 
                            variant={isDarkTheme ? "secondary" : "outline"} 
                            size="sm"
                        onClick = {() => openResume(applicant.resume)}
                          >
                            {applicant.resume ? 'View Resume' : 'No Resume'}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {applicants.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={4} className={`text-center h-24 ${styles.secondaryTextColor}`}>
                          No applicants found for this job
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          ) : (
            <div className={`flex items-center justify-center h-full ${styles.secondaryTextColor}`}>
              Select a job from the left to view applicants
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  );
};

export default JobsApplicantsUI;