// Default config setup: 
const switchConfigDefaultState = {
  alternateDelimiterOn: true,
  negativeDenialOn: true,
  upperBoundOn: true,
  maxConstraintOn: false,
};

export function getStateOfSwitchConfig(switchInput = switchConfigDefaultState) {
  return { ...switchConfigDefaultState, ...switchInput };
}