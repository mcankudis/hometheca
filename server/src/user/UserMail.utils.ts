import { Locale } from '@hometheca/shared';
import { User } from './User';

export class UserMailUtils {
    constructor(
        private readonly user: User,
        private readonly serverPath: string
    ) {}

    public getEmailSenderName() {
        switch (this.user.locale) {
            case Locale.EN:
            case Locale.DE:
                return 'Hometheca Account Service';
            case Locale.PL:
                return 'Menadżer kont Hometheca';
            default:
                const _exhaustivenessCheck: never = this.user.locale;
                throw new Error(`Unknown locale: ${_exhaustivenessCheck}`);
        }
    }

    public getVerificationEmailSubject() {
        switch (this.user.locale) {
            case Locale.EN:
                return 'Verify your email';
            case Locale.DE:
                return 'Email bestätigen';
            case Locale.PL:
                return 'Potwierdzenie adresu email';
            default:
                const _exhaustivenessCheck: never = this.user.locale;
                throw new Error(`Unknown locale: ${_exhaustivenessCheck}`);
        }
    }

    // todo dynamic translations
    public getVerificationEmailHtml() {
        const buttonStyle = `border-top:13px solid;border-bottom:13px solid;border-right:24px solid;border-left:24px solid;border-color:#92E894;border-radius:4px;background-color:#92E894;color:#ffffff;font-size:16px;line-height:18px;word-break:break-word;font-weight:bold;font-size:14px;border-top:20px solid;border-bottom:20px solid;border-color:#92E894;line-height:14px;letter-spacing:0.8px;text-transform:uppercase;box-sizing:border-box;width:100%;text-align:center;display:inline-block;text-align:center;font-weight:900;text-decoration:none!important`;

        switch (this.user.locale) {
            case Locale.EN:
                return `<b>Welcome to Hometheca, ${this.user.username}!</b>
					<p>Please click the link below to finish setting up your account.</p>
					<a style="${buttonStyle}" href="${this.serverPath}/verify-email/${this.user.account.emailVerificationToken}">Confirm email address</a>
					<br>
					<br>
					Kind regards
                    <br>
                    <br>
					Your Hometheca-Team</p>`;
            case Locale.DE:
                return `<b>Willkommen bei Hometheca, ${this.user.username}!</b>
                    <p>Bitte klicke auf den Link unten, um dein Konto einzurichten.</p>
                    <a style="${buttonStyle}" href="${this.serverPath}/verify-email/${this.user.account.emailVerificationToken}">E-Mail-Adresse bestätigen</a>
                    <br>
                    <br>
                    Mit freundlichen Grüßen
                    <br>
                    <br>
                    Dein Hometheca-Team</p>`;
            case Locale.PL:
                return `<b>Witaj w Homethece, ${this.user.username}!</b>
                    <p>Kliknij poniższy link, aby dokończyć konfigurację konta.</p>
                    <a style="${buttonStyle}" href="${this.serverPath}/verify-email/${this.user.account.emailVerificationToken}">Potwierdź adres email</a>
                    <br>
                    <br>
                    Pozdrawiamy
                    <br>
                    <br>
                    Zespół Hometheca</p>`;
            default:
                const _exhaustivenessCheck: never = this.user.locale;
                throw new Error(`Unknown locale: ${_exhaustivenessCheck}`);
        }
    }
}
