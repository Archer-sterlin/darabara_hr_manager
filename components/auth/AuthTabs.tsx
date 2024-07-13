import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import LoginForm from "./LoginForm";
import ForgetPasswordForm from "./ForgetPasswordForm";
const AuthTabs = () => {
    return (
     <Tabs defaultValue="login" className="w-[400px]">
    <TabsList className='grid w-full grid-cols-2'>
      <TabsTrigger value="login">Login</TabsTrigger>
       <TabsTrigger value="forget_password">Forget Password</TabsTrigger> 
    </TabsList>
    <TabsContent value="login"><LoginForm /></TabsContent>
    <TabsContent value="forget_password"><ForgetPasswordForm/></TabsContent> 
  </Tabs>
   );
}
 
export default AuthTabs;