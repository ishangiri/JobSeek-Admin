import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Camera, Edit2 } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useDashboardContext } from '../pages/DashboardLayout';
import { useState, useEffect } from 'react';
import fetchData from '../utils/fetchUtil';
import { toast } from 'react-toastify';

const formSchema = z.object({
  company: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  avatar : z.any().optional()
  })


const CompanyProfile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState (null);
  const [image, setImage] = useState (null);
  const [loading, setLoading] = useState (false);

  const {isDarkTheme, user} = useDashboardContext();
  

  //uploading image
  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]){
      setImage(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]))
    }
  }

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company: '',
      location: '',
    },
  });

  //getting the user information
  useEffect(() => {
    if (user?.company || user?.location) {
      form.reset({
        company: user.company || '',
        location: user.location || '',
      });
      setIsLoading(false);
    }
  }, [user, form]);

  const uploadAvatar = async () => {
    if (!image) {
      toast.error("Please select an image before uploading.");
      return;
    }
  
    const formData = new FormData();
    formData.append("avatar", image);
  
    try {
      setLoading(true);
      await fetchData.patch("users/updateAvatar", formData);
      toast.success("Avatar updated successfully!");
      // Optionally update the user's profile image immediately after upload
      setImagePreview(URL.createObjectURL(image));
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Failed to upload avatar.");
    }
    setLoading(false);
  };
  

  //calling api to update the user's company and location
  const onSubmit = async (data) => {
      
    try{
      console.log(data);
      
      await fetchData.patch("users/updateUser", data);
      toast.success("Company updated successfully");
    } catch(err) {
         console.log(err);
         toast.error(err?.response.data.message)
    }
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <Card className="w-full max-w-xl mx-auto">
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card style = {{backgroundColor : isDarkTheme? "#3F3F3F" : "#EEEE", color : isDarkTheme? "white" : "black"}} className="w-full max-w-xl mx-auto">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold">Company Profile</CardTitle>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsEditing(!isEditing)}
          >
            <Edit2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col items-center space-y-6">
          {/* Avatar Section */}
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
              <img 
                src={imagePreview ? imagePreview : user?.avatar} 
                alt="Company avatar" 
                className="w-full h-full object-cover" 
              />
            </div>
            {isEditing && (
              <label 
                htmlFor="avatar" 
                className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg cursor-pointer hover:bg-gray-50 border border-gray-200"
              >
                <Camera className="w-5 h-5 text-gray-600" />
                <input
                  id="avatar"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={onImageChange}
                />
              </label>
            )}
          </div>

          {/* Email display */}
          <div className="text-center">
            <p className="text-sm">Email</p>
            <p className="font-light">{user?.email}</p>
          </div>
        {isEditing && 
            <Button onClick = {uploadAvatar}>
            {loading ? "Uploading Avatar..." : "Upload Avatar"}
          </Button>
          }
        

          <Separator className="my-4" />

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      {isEditing ? (
                        <Input {...field} className="w-full" />
                      ) : (
                        <p className="font-bold pt-2">{field.value}</p>
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      {isEditing ? (
                        <Input {...field} className="w-full" />
                      ) : (
                        <p className="font-bold  pt-2">{field.value}</p>
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {isEditing && (
                <div className="flex gap-4 text-black">
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      setIsEditing(false);
                      form.reset();
                      setImagePreview(null);
                      setImage(null);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="w-full">
                    Save Changes
                  </Button>
                </div>
              )}
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyProfile;