<?php
include('lib/class.phpmailer.php');			
include('lib/class.smtp.php');				

class mailserver
{

	// personal email address to send messages to
	private $recipient = 'f.macneill1@uni.brighton.ac.uk';

	// JSON output
	public $response = array();  	
	
	
	function __construct()
    {
	}
	
	function __destruct()
    {
	}

	private function postParam($name)
	{
		if(isset($_POST[$name])) return urldecode($_POST[$name]);
		else				 	 return null;
	}

	public function handleRequest()
	{
		$email = $this->postParam('email');
		$subject = $this->postParam('subject');
		$message = $this->postParam('message');
		
		if($email == null) 				{$this->response['error'] = 'Parameter email missing';}
		else if($subject == null) 		{$this->response['error'] = 'Parameter message missing';}
		else if($message == null) 		{$this->response['error'] = 'Parameter message missing';}	
		else 
		{
			$mail = new PHPMailer(true);
			try
			{
				$mail->IsSMTP(); 
				$mail->SMTPDebug = 0; // SMTP debug information: 1 = errors and messages, 2 = messages only
				$mail->SMTPAuth = true;  
				$mail->SMTPSecure = 'ssl'; 
				$mail->Host = 'smtp.gmail.com'; 
				$mail->Port = 465;
				$mail->Username = 'medicalwearable@gmail.com';
				$mail->Password = 'T8Y@Dv!4ezi9';
				$mail->AddReplyTo($email, $email);
				$mail->SetFrom('medicalwearable@gmail.com', 'Contact Form MedWear');
				$mail->AddAddress($this->recipient, $this->recipient);
				$mail->Subject = $subject;
				$mail->Body = $message;
				$mail->Send();
			}
			catch (phpmailerException $e) 
			{
				$this->response['error'] = $e->errorMessage(); 
			} 
			catch (Exception $e) 
			{
				$this->response['error'] = $e->getMessage(); 
			}	

			$this->response['status'] = (array_key_exists ('error', $this->response)) ? 'err' : 'ok';
			
		} 
	} // handleRequest()
} // end class mailserver

header('Content-type: application/json; charset=UTF-8');
$server = new mailserver();
$server->handleRequest();
echo json_encode($server->response);
?>