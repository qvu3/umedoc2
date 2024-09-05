import { environment } from '../environments/environment';

export default class Global {
	public static DoseUrl = environment.DoseUrl;
	public static embebedId = environment.embededId;
	public static stripePublicKey = environment.stripePublicKey;
	public static CompnayID = environment.companyId;
	public static apiUrl = environment.apiUrl;
	public static apiHub = environment.apiHub;
	public static currentUser: string = '___umedoc_client_admin__current_user___';
	public static defaultDateKey: string = '____defaultDate___';
	public static mode = environment.mode;
	public static DailyCoUrl = environment.DailyCoUrl;

	public static getToken(): string {
		// Retrieve the item from sessionStorage
		const currentUserString = sessionStorage.getItem(Global.currentUser);
	  
		// Check if the item is not null
		if (currentUserString) {
		  const currentUser = JSON.parse(currentUserString);
	  
		  // Ensure currentUser is valid and has an access_token
		  if (currentUser && currentUser.access_token) {
			return 'Bearer ' + currentUser.access_token;
		  }
		}
	  
		// Return an empty string if no token is found
		return '';
	  }
	  	  
	public static US_StateList = [
		{ value: 'AL', name: 'Alabama' },
		{ value: 'AK', name: 'Alaska' },
		{ value: 'AZ', name: 'Arizona' },
		{ value: 'AR', name: 'Arkansas' },
		{ value: 'CA', name: 'California' },
		{ value: 'CO', name: 'Colorado' },
		{ value: 'CT', name: 'Connecticut' },
		{ value: 'DE', name: 'Delaware' },
		{ value: 'DC', name: 'Washington DC' },
		{ value: 'FL', name: 'Florida' },
		{ value: 'GA', name: 'Georgia' },
		{ value: 'HI', name: 'Hawaii' },
		{ value: 'ID', name: 'Idaho' },
		{ value: 'IL', name: 'Illinois' },
		{ value: 'IN', name: 'Indiana' },
		{ value: 'IA', name: 'Iowa' },
		{ value: 'KS', name: 'Kansas' },
		{ value: 'KY', name: 'Kentucky' },
		{ value: 'LA', name: 'Louisiana' },
		{ value: 'ME', name: 'Maine' },
		{ value: 'MD', name: 'Maryland' },
		{ value: 'MA', name: 'Massachusetts' },
		{ value: 'MI', name: 'Michigan' },
		{ value: 'MN', name: 'Minnesota' },
		{ value: 'MS', name: 'Mississippi' },
		{ value: 'MO', name: 'Missouri' },
		{ value: 'MT', name: 'Montana' },
		{ value: 'NE', name: 'Nebraska' },
		{ value: 'NV', name: 'Nevada' },
		{ value: 'NH', name: 'New Hampshire' },
		{ value: 'NJ', name: 'New Jersey' },
		{ value: 'NM', name: 'New Mexico' },
		{ value: 'NY', name: 'New York' },
		{ value: 'NC', name: 'North Carolina' },
		{ value: 'ND', name: 'North Dakota' },
		{ value: 'OH', name: 'Ohio' },
		{ value: 'OK', name: 'Oklahoma' },
		{ value: 'OR', name: 'Oregon' },
		{ value: 'PA', name: 'Pennesylvania' },
		{ value: 'RI', name: 'Rhode Island' },
		{ value: 'SC', name: 'South Carolina' },
		{ value: 'SD', name: 'South Dakota' },
		{ value: 'TN', name: 'Tennessee' },
		{ value: 'TX', name: 'Texas' },
		{ value: 'UT', name: 'Utah' },
		{ value: 'VT', name: 'Vermont' },
		{ value: 'VA', name: 'Virginia' },
		{ value: 'WA', name: 'Washington' },
		{ value: 'WV', name: 'West Virginia' },
		{ value: 'WS', name: 'Wisconsin' },
		{ value: 'WY', name: 'Wyoming' },
	];
}

export class RoleConstants {
	public static SpecialAdmin = "Special_Admin";
	public static CompanyAdmin = "Company_Admin";
	public static Patient = "Patient";
	public static Provider = "Provider";
}

export class AppointmentStatusConstants {
	public static BOOKED = "BOOKED";
	public static Available = "Available";
	public static Unavailable = "Unavailable";
}

export class SignatureDocumentTemplate {
	public static WorkRelease = "Work_Release";
	public static LabOrder = "LabOrder";
	public static Referral = "Referral";
}

export class ProviderTaskStatus {
	public static Todo = "To-do";
	public static Completed = "Completed";
}


