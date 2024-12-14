import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
  } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

export const FormInputField = ({ 
    control, 
    name, 
    label, 
    placeholder, 
    type = "text" 
  }) => (
    <div className='w-full mb-4'>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-bold text-blue-700">
              {label}
            </FormLabel>
            <FormControl>
              {type === 'select' ? (
                <select 
                  {...field} 
                  className="w-full p-2 border rounded bg-white focus:outline-blue-500"
                >
                  {field.name === 'jobStatus' && (
                    <>
                      <option value="pending">Pending</option>
                      <option value="interview">Interview</option>
                      <option value="declined">Declined</option>
                    </>
                  )}
                  {field.name === 'jobType' && (
                    <>
                      <option value="full-time">Full Time</option>
                      <option value="part-time">Part Time</option>
                      <option value="internship">Internship</option>
                    </>
                  )}
                </select>
              ) : (
                <Input 
                  placeholder={placeholder} 
                  {...field} 
                  className="focus:border-blue-500"
                />
              )}
            </FormControl>
            <FormMessage className="text-red-500 text-sm mt-1" />
          </FormItem>
        )}
      />
    </div>
  )