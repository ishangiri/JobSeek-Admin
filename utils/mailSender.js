import nodemailer from 'nodemailer';

export const mailsender = async (email, title, body) => {

  try{
    let transporter = nodemailer.createTransport({
        host : process.env.MAIL_HOST,
        auth : {
            user : process.env.MAIL_USER,
            pass : process.env.MAIL_PASS,
        }
    });

    let emailInfo = await transporter.sendMail({
        from : `"Ishan Giri" <${process.env.MAIL_USER}>`,
        to : email,
        subject : title,
        html : body,
    });
    console.log('Email Info : ', emailInfo);
    return emailInfo;
    } catch (error){
        console.log(error);
        
    }


}

