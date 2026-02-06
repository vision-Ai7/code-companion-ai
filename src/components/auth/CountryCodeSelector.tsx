import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CountryCode {
  code: string;
  dial_code: string;
  name: string;
}

const countryCodes: CountryCode[] = [
  { code: 'IN', dial_code: '+91', name: 'India' },
  { code: 'US', dial_code: '+1', name: 'United States' },
  { code: 'GB', dial_code: '+44', name: 'United Kingdom' },
  { code: 'CA', dial_code: '+1', name: 'Canada' },
  { code: 'AU', dial_code: '+61', name: 'Australia' },
  { code: 'DE', dial_code: '+49', name: 'Germany' },
  { code: 'FR', dial_code: '+33', name: 'France' },
  { code: 'JP', dial_code: '+81', name: 'Japan' },
  { code: 'CN', dial_code: '+86', name: 'China' },
  { code: 'BR', dial_code: '+55', name: 'Brazil' },
  { code: 'AE', dial_code: '+971', name: 'UAE' },
  { code: 'SG', dial_code: '+65', name: 'Singapore' },
  { code: 'NZ', dial_code: '+64', name: 'New Zealand' },
  { code: 'ZA', dial_code: '+27', name: 'South Africa' },
  { code: 'KR', dial_code: '+82', name: 'South Korea' },
  { code: 'MX', dial_code: '+52', name: 'Mexico' },
  { code: 'IT', dial_code: '+39', name: 'Italy' },
  { code: 'ES', dial_code: '+34', name: 'Spain' },
  { code: 'NL', dial_code: '+31', name: 'Netherlands' },
  { code: 'SE', dial_code: '+46', name: 'Sweden' },
];

interface CountryCodeSelectorProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export const CountryCodeSelector = ({ value, onChange, disabled }: CountryCodeSelectorProps) => {
  return (
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger className="w-[100px]">
        <SelectValue placeholder="+91" />
      </SelectTrigger>
      <SelectContent>
        {countryCodes.map((country) => (
          <SelectItem key={country.code} value={country.dial_code}>
            {country.dial_code} {country.code}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
