import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "react-toastify";
import { useState } from "react";
import React from "react";

const ApplicantCard = ({ applicant, isDarkTheme, openResume, onStatusChange, openCalendar }) => {
  const [date, setDate] = useState(new Date());
  const [time, setSelectedTime] = useState("");
  const [localStatus, setLocalStatus] = useState("");
  const [selectedApplicantId, setSelectedApplicantId] = useState("");

  const styles = {
    textColor: isDarkTheme ? "text-gray-200" : "text-gray-900",
    secondaryTextColor: isDarkTheme ? "text-gray-300" : "text-gray-600",
    cardBg: isDarkTheme ? "#4D4D4D" : "white",
  };

  // Define status options
  const statusOptions = ["pending", "interview", "declined"];

  // Handle status change in the dialog
  const handleDialogStatusChange = (status) => {
    setLocalStatus(status);
  };

  const saveChanges = async () => {
    try {
      if (selectedApplicantId && localStatus) {
        await onStatusChange(selectedApplicantId, localStatus);
      }
      toast.success("Changes saved successfully");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
  };

  const badgeColor = (status) => {
    switch (status) {
      case "pending":
        return "yellow";
      case "interview":
        return "green";
      case "declined":
        return "red";
      default:
        return "gray";
    }
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
          <p className={styles.secondaryTextColor}>{applicant.email}</p>
          <p className={styles.secondaryTextColor}>{applicant.location || 'N/A'}</p>
        </div>
      </div>
      
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          {/* Status Badge with Dialog */}
          <Dialog key={applicant.applicantId}>
            <DialogTrigger asChild>
              <Badge 
                style={{
                  cursor: "pointer", 
                  backgroundColor: badgeColor(applicant.status), 
                  color: "black", 
                  font: "bold"
                }}
                onClick={() => setSelectedApplicantId(applicant.applicantId)}
                variant={isDarkTheme ? "secondary" : "outline"}
              >
                {applicant.status}
              </Badge>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-slate-950">Edit Applicant Status</DialogTitle>
                <DialogDescription>
                  Make Changes to the applicant status
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Label className="text-slate-950">Status</Label>
                <Select
                  className="text-black"
                  defaultValue={localStatus}
                  onValueChange={handleDialogStatusChange}
                  defaultOpen={true}
                >
                  <SelectTrigger className="w-full text-slate-950">
                    <SelectValue className="text-slate-950" placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((status) => (
                      <SelectItem className="text-black" key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="secondary" onClick={saveChanges}>
                    Save
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Resume Button */}
          <Button
            variant={isDarkTheme ? "secondary" : "default"}
            size="sm"
            onClick={() => openResume(applicant.resume)}
          >
            {applicant.resume ? 'View Resume' : 'No Resume'}
          </Button>
        </div>

        {/* Interview Scheduled Badge */}
        {applicant.interViewScheduled && (
          <Badge variant={isDarkTheme ? "secondary" : "outline"} className="self-start">
            Interview Scheduled for {applicant.interViewDate}
          </Badge>
        )}

        {/* Schedule Interview Button & Dialog */}
        {(applicant.status === "interview" && !applicant.interViewScheduled) && (
          <Dialog>
            <DialogTrigger asChild>
              <Button
                onClick={() => setSelectedApplicantId(applicant.applicantId)}
                variant={isDarkTheme ? "secondary" : "outline"}
                size="sm"
                className="self-start"
              >
                Schedule for Interview
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-slate-600 text-white">
              <DialogHeader>
                <DialogTitle className="text-slate-950">Schedule Interview</DialogTitle>
                <DialogDescription>
                  Select a date and time for the interview
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
                <div className="mt-4">
                  <Label htmlFor="time" className="text-slate-950">Time</Label>
                  <Select value={time} onValueChange={setSelectedTime}>
                    <SelectTrigger id="time" className="w-full text-slate-950 mt-2">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="9:00">9:00 AM</SelectItem>
                      <SelectItem value="10:00">10:00 AM</SelectItem>
                      <SelectItem value="11:00">11:00 AM</SelectItem>
                      <SelectItem value="13:00">1:00 PM</SelectItem>
                      <SelectItem value="14:00">2:00 PM</SelectItem>
                      <SelectItem value="15:00">3:00 PM</SelectItem>
                      <SelectItem value="16:00">4:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    type="button"
                    onClick={() => {
                      openCalendar(selectedApplicantId, date, time);
                    }}
                  >
                    Schedule
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </Card>
  );
};

export default ApplicantCard;