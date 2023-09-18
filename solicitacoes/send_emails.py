from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import smtplib

def send_email_to(emailTo, msg):
    host = "smtp.br.bosch.com"
    port = "25"
    server = smtplib.SMTP(host, port)

    email = 'bot_manufacturing.tef_maintenanceplanning@br.bosch.com'

    server.ehlo()
    server.starttls()
    
    message = MIMEMultipart('alternative')
    message['Subject'] = 'Emulador Web TEF'
    message['From'] = email
    message['To'] = emailTo

    
    message.attach(MIMEText(msg,'html'))

    server.sendmail(email,emailTo,message.as_string())
    server.quit()


def reset_password(emailTo, password):
    msg = """
        <html>
            <head></head>
            <body>
            <p>Olá aqui esta sua nova senha do Emulador da TEF!</p>
            <p></p>
            <p>Aqui está sua senha para uso do Emulador Web</p>
            <p>Senha: <b>"""+password+"""</b></p>
            <p></p>
            <p>Saudações / Best regards,</p>
            <p></p>
            <p><b>TEF2</b></p>
            </body>
        </html>
            """
    send_email_to(emailTo, msg)

def send_password(emailTo, password):
    msg = """
     <html>
        <head></head>
        <body>
        <p>Olá sua solicitação ao Emulador da TEF foi aprovada!</p>
        <p></p>
        <p>Aqui está sua senha para uso do Emulador Web</p>
        <p>Senha: <b>"""+password+"""</b></p>
        <p></p>
        <p>Saudações / Best regards,</p>
        <p></p>
        <p><b>TEF2</b></p>
        </body>
    </html>
        """
    send_email_to(emailTo, msg)
    
def confirmation(emailTo, data):
    msg = """
    <html>  
        <head></head>
        <body>
            <p>Sua Solicitação foi enviada com sucesso. Segue resumo da sua solicitação:</p>
            <p></p>
            <p>Setor: """+data["setor"]+"""     Ramal: """+data["ramal"]+"""</p>
            <p>Local Debito: """+data["tipo_debito"]+"""    Nº do Local de Débito: """+data["local_debito_numero"]+"""</p>
            <p>Tipo de Debito: """+data["local_debito_tipo"]+"""</p>
            <p>Categoria: """+data["categoria"]+"""</p>
            <p>Tipo de Serviço: """+data["tipo_de_servico"]+"""</p>
            <p>Prazo solicitado: """+data["prazo_pretendido"]+"""</p>
            <p>Descrição: """+data["descricao"]+"""</p>
            <p>Nº Desenho: """+data["n_desenho"]+"""    Grupo: """+data["grupo"]+"""</p>
            <p>Para prazos inferiores ou necessidades especiais, favor entrar em contato com CaP/TEF22.</p>
            <p></p>
            <p>Aguarde o proximo contato para a sequência da sua usinagem. Muito Obrigado.</p>
            <p></p>
            <p>CaP/TEF22</p>
        </body>
    </html>
    """


    send_email_to(emailTo, msg)