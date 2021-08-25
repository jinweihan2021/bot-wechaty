import * as $protobuf from "protobufjs";
/** Namespace tarot. */
export namespace tarot {

    /** Properties of a TarotRepo. */
    interface ITarotRepo {

        /** TarotRepo majors */
        majors?: (tarot.ICard[]|null);

        /** TarotRepo minors */
        minors?: (tarot.IMinorCardGroup[]|null);
    }

    /** Represents a TarotRepo. */
    class TarotRepo implements ITarotRepo {

        /**
         * Constructs a new TarotRepo.
         * @param [properties] Properties to set
         */
        constructor(properties?: tarot.ITarotRepo);

        /** TarotRepo majors. */
        public majors: tarot.ICard[];

        /** TarotRepo minors. */
        public minors: tarot.IMinorCardGroup[];

        /**
         * Creates a new TarotRepo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TarotRepo instance
         */
        public static create(properties?: tarot.ITarotRepo): tarot.TarotRepo;

        /**
         * Encodes the specified TarotRepo message. Does not implicitly {@link tarot.TarotRepo.verify|verify} messages.
         * @param message TarotRepo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: tarot.ITarotRepo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified TarotRepo message, length delimited. Does not implicitly {@link tarot.TarotRepo.verify|verify} messages.
         * @param message TarotRepo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: tarot.ITarotRepo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a TarotRepo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TarotRepo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tarot.TarotRepo;

        /**
         * Decodes a TarotRepo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TarotRepo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tarot.TarotRepo;

        /**
         * Verifies a TarotRepo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TarotRepo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TarotRepo
         */
        public static fromObject(object: { [k: string]: any }): tarot.TarotRepo;

        /**
         * Creates a plain object from a TarotRepo message. Also converts values to other types if specified.
         * @param message TarotRepo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: tarot.TarotRepo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TarotRepo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Card. */
    interface ICard {

        /** Card index */
        index?: (string|null);

        /** Card name */
        name?: (string|null);

        /** Card meaning */
        meaning?: (string|null);
    }

    /** Represents a Card. */
    class Card implements ICard {

        /**
         * Constructs a new Card.
         * @param [properties] Properties to set
         */
        constructor(properties?: tarot.ICard);

        /** Card index. */
        public index: string;

        /** Card name. */
        public name: string;

        /** Card meaning. */
        public meaning: string;

        /**
         * Creates a new Card instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Card instance
         */
        public static create(properties?: tarot.ICard): tarot.Card;

        /**
         * Encodes the specified Card message. Does not implicitly {@link tarot.Card.verify|verify} messages.
         * @param message Card message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: tarot.ICard, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Card message, length delimited. Does not implicitly {@link tarot.Card.verify|verify} messages.
         * @param message Card message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: tarot.ICard, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Card message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Card
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tarot.Card;

        /**
         * Decodes a Card message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Card
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tarot.Card;

        /**
         * Verifies a Card message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Card message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Card
         */
        public static fromObject(object: { [k: string]: any }): tarot.Card;

        /**
         * Creates a plain object from a Card message. Also converts values to other types if specified.
         * @param message Card
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: tarot.Card, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Card to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a MinorCardGroup. */
    interface IMinorCardGroup {

        /** MinorCardGroup groupName */
        groupName?: (string|null);

        /** MinorCardGroup groupMeaning */
        groupMeaning?: (string|null);

        /** MinorCardGroup cards */
        cards?: (tarot.ICard[]|null);
    }

    /** Represents a MinorCardGroup. */
    class MinorCardGroup implements IMinorCardGroup {

        /**
         * Constructs a new MinorCardGroup.
         * @param [properties] Properties to set
         */
        constructor(properties?: tarot.IMinorCardGroup);

        /** MinorCardGroup groupName. */
        public groupName: string;

        /** MinorCardGroup groupMeaning. */
        public groupMeaning: string;

        /** MinorCardGroup cards. */
        public cards: tarot.ICard[];

        /**
         * Creates a new MinorCardGroup instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MinorCardGroup instance
         */
        public static create(properties?: tarot.IMinorCardGroup): tarot.MinorCardGroup;

        /**
         * Encodes the specified MinorCardGroup message. Does not implicitly {@link tarot.MinorCardGroup.verify|verify} messages.
         * @param message MinorCardGroup message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: tarot.IMinorCardGroup, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MinorCardGroup message, length delimited. Does not implicitly {@link tarot.MinorCardGroup.verify|verify} messages.
         * @param message MinorCardGroup message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: tarot.IMinorCardGroup, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MinorCardGroup message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MinorCardGroup
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tarot.MinorCardGroup;

        /**
         * Decodes a MinorCardGroup message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MinorCardGroup
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tarot.MinorCardGroup;

        /**
         * Verifies a MinorCardGroup message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MinorCardGroup message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MinorCardGroup
         */
        public static fromObject(object: { [k: string]: any }): tarot.MinorCardGroup;

        /**
         * Creates a plain object from a MinorCardGroup message. Also converts values to other types if specified.
         * @param message MinorCardGroup
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: tarot.MinorCardGroup, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MinorCardGroup to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}
