"use strict";

const sgMail = require("@sendgrid/mail");
const SWIG = require("swig");
const FS = require("fs");
const { log } = require("./debug");

const FROM_EMAIL_ADDRESS = "noreply@ispot.store";
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
let APP_ROOT = process.env.PWD;
if (process.env.platform === "win32" || process.env.platform === "win64") {
  APP_ROOT = process.cwd();
}

function buildRecipient(list = []) {
  return list.map((r) => {
    return {
      email: r,
    };
  });
}

class EmailService {
  static sendSimpleEmail(
    subject,
    text,
    recipients,
    from,
    html,
    templateName,
    templateData,
    attachment,
    attachmentName,
    isStream
  ) {
    const to = buildRecipient(recipients.to);
    const cc = buildRecipient(recipients.cc);
    const bcc = buildRecipient(recipients.bcc);
    if (!html && !!templateName) {
      html = EmailService.getHTMLTemplate(templateName, templateData);
    }
    const attachments = [];
    if (attachment) {
      attachments.push({
        filename: attachmentName || attachment,
        content: isStream
          ? attachment
          : EmailService.getBase64AttachmentContent(attachment),
        disposition: "attachment",
      });
    }

    const emailData = {
      personalizations: [{ to, cc, bcc }],

      replyTo: from || FROM_EMAIL_ADDRESS,
      from: { email: from || FROM_EMAIL_ADDRESS, name: "PHPA-II" },
      subject,
      text: text || " ",
      html: html || " ",
      attachments,
    };
    return EmailService._send(emailData, subject);
  }

  static sendTemplateEmail(subject, templateId, templateData, recipients) {
    const to = recipients.map((r) => {
      return {
        email: r,
      };
    });
    const emailData = {
      to,
      from: FROM_EMAIL_ADDRESS,
      subject,
      templateId,
      dynamic_template_data: templateData,
    };
    return this._send(emailData);
  }

  static _send(emailData) {
    sgMail.send(emailData, true, (error) => {
      if (error) {
        log(error);
      }
    });
  }

  static getFullTemplatePath(templateName) {
    return `${APP_ROOT}/src/emailTemplates/${templateName}`;
  }

  static getHTMLTemplate(templateName, params) {
    const fullTemplatePath = EmailService.getFullTemplatePath(templateName);
    const template = SWIG.compileFile(fullTemplatePath);
    return template(params);
  }

  static getBase64AttachmentContent(attachment) {
    // Lets convert to fully qualified path
    return FS.readFileSync(attachment, { encoding: "base64" });
  }
}

module.exports = EmailService;
