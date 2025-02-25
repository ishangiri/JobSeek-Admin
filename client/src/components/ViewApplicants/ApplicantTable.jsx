import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
} from "@/components/ui/dialog"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "../ui/select";
import { Label } from "@/components/ui/label"
import { toast } from "react-toastify";
import { useState } from "react";
import {Calendar} from "@/components/ui/calendar";
import React from "react";



const ApplicantTable = ({ applicants, isDarkTheme, openResume, onStatusChange }) => {

  const [date, setDate] = useState(new Date());
  const [time, setSelectedTime] = useState("");

  const styles = {
    textColor: isDarkTheme ? "text-gray-200" : "text-gray-900",
    borderColor: isDarkTheme ? "border-gray-600" : "border-gray-200",
  };

  //local states for the select input value
  const [localStatus, setLocalStatus] = useState("");
  //local state for applicant id.
  const [selectedApplicantId, setSelectedApplicantId] = useState(""); 

  // Define status options
  const statusOptions = ["pending", "interview", "declined"];

  // Handle status change in the dialog
  const handleDialogStatusChange = (status) => {
    setLocalStatus(status);
  };

  const saveChanges = async () => {
    try{
      if(selectedApplicantId && localStatus){
        await onStatusChange(selectedApplicantId, localStatus);
      }
      toast.success("Changes saved successfully");
    }catch(error){
      toast.error(error?.response?.data?.msg);
    }

   
  }

  const openCalendar = async (applicantId, date, time) => {
        toast.info(`Interview scheduled successfully  on ${date.toLocaleDateString()} at ${time}`);
  };


  return (
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
              
              <TableRow key = {applicant.applicantId} className={styles.borderColor}>
            <TableCell>
              <div className="flex items-center gap-4">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={`https://i.pravatar.cc/150?u=${applicant.email}`} />
                  <AvatarFallback>{applicant.name}</AvatarFallback>
                </Avatar>
                <div>
                  <p className={`font-medium ${styles.textColor}`}>{applicant.name}</p>
                  <p className="text-xs">{applicant.email}</p>
                </div>
              </div>
            </TableCell>
            <TableCell>
            <Dialog key={applicant.applicantId} asChild>
            <DialogTrigger asChild>
              <Badge style={{cursor : "pointer"}}   onClick = {() => setSelectedApplicantId(applicant.applicantId)} variant={isDarkTheme ? "secondary" : "outline"}>
                {applicant.status}
              </Badge>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className = "text-slate-950"> Edit Applicant Status</DialogTitle>
                  <DialogDescription>
                   Make Changes to the applicant status
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <Label className = "text-slate-950">Status</Label>
                    <Select
                    className = "text-black"
                defaultValue={localStatus}
                onValueChange = {handleDialogStatusChange}
                 defaultOpen = {true}
              >
                <SelectTrigger className="w-[120px] text-slate-950">
                <SelectValue className="text-slate-950"  placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((status) => (
                    <SelectItem className = "text-black" key={status} value={status}>
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
            </TableCell>
            <TableCell className={styles.textColor}>{applicant.location || 'N/A'}</TableCell>
            <TableCell>
              <div className = "flex items-center gap-4">
              <Button 
                variant={isDarkTheme ? "secondary" : "outline"} 
                size="sm"
                onClick={() => openResume(applicant.resume)}
              >
                {applicant.resume ? 'View Resume' : 'No Resume'}
              </Button>
<Dialog>
  <DialogTrigger asChild>
    {applicant.status === "interview" && (
      <Button 
        onClick={() => setSelectedApplicantId(applicant.applicantId)} 
        variant={isDarkTheme ? "secondary" : "outline"} 
        size="sm"
      >
        Schedule for Interview
      </Button>
    )}
  </DialogTrigger>
  <DialogContent className="sm:max-w-[425px] bg-slate-600 text-white" >
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
              
              </div>
             
            </TableCell>
        
        
          </TableRow>
       
        ))}
      </TableBody>
    </Table>
  );
};

export default ApplicantTable;