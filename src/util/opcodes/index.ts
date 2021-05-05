import { AcknowledgeHearbeat } from "./AcknowledgeHearbeat";
import { Dispatch } from "./Dispatch";
import { Heartbeat } from "./Heartbeat";
import { Hello } from "./Hello";
import { InvalidSession } from "./InvalidSession";

const OPCodeHandlers = {
	0: Dispatch,
	1: Heartbeat,
	9: InvalidSession,
	10: Hello,
	11: AcknowledgeHearbeat,
};

export default OPCodeHandlers;

export interface Payload {
	op: number;
	d?: any;
	s?: number;
	t?: string;
}
