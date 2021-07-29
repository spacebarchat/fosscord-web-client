import { AcknowledgeHearbeat } from "./AcknowledgeHearbeat";
import { Dispatch } from "./Dispatch";
import { Heartbeat } from "./Heartbeat";
import { Hello } from "./Hello";

const OPCodeHandlers = {
	0: Dispatch,
	1: Heartbeat,
	//2: onIdentify,
	//3: onPresenceUpdate,
	//4: onVoiceStateUpdate,
	// 5: Voice Server Ping
	//6: onResume,
	// 7: Reconnect: You should attempt to reconnect and resume immediately.
	//8: onRequestGuildMembers,
	// 9: Invalid Session
	10: Hello,
	11: AcknowledgeHearbeat,
	//14: onLazyRequest,
};

export default OPCodeHandlers;

export interface Payload {
	op: number;
	d?: any;
	s?: number;
	t?: string;
}
