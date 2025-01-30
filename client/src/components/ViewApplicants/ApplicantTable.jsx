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

const ApplicantTable = ({ applicants, isDarkTheme, openResume, onStatusChange }) => {
  const styles = {
    textColor: isDarkTheme ? "text-gray-200" : "text-gray-900",
    borderColor: isDarkTheme ? "border-gray-600" : "border-gray-200",
  };

  const [localStatus, setLocalStatus] = useState("");
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
              <Dialog key={applicant.applicantId} asChild>
              <DialogTrigger asChild>
              <TableRow key={applicant.applicantId} style = {{cursor : "pointer"}}  className={styles.borderColor} onClick = {() => setSelectedApplicantId(applicant.applicantId)}>
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
              <Badge variant={isDarkTheme ? "secondary" : "outline"}>
                {applicant.status}
              </Badge>
            </TableCell>
            <TableCell className={styles.textColor}>{applicant.location || 'N/A'}</TableCell>
            <TableCell>
              <Button 
                variant={isDarkTheme ? "secondary" : "outline"} 
                size="sm"
                onClick={() => openResume(applicant.resume)}
              >
                {applicant.resume ? 'View Resume' : 'No Resume'}
              </Button>
            </TableCell>
        
        
          </TableRow>
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
       
        ))}
      </TableBody>
    </Table>
  );
};

export default ApplicantTable;