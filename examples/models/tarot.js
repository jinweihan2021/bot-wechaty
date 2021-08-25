/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.tarot = (function() {

    /**
     * Namespace tarot.
     * @exports tarot
     * @namespace
     */
    var tarot = {};

    tarot.TarotRepo = (function() {

        /**
         * Properties of a TarotRepo.
         * @memberof tarot
         * @interface ITarotRepo
         * @property {Array.<tarot.ICard>|null} [majors] TarotRepo majors
         * @property {Array.<tarot.IMinorCardGroup>|null} [minors] TarotRepo minors
         */

        /**
         * Constructs a new TarotRepo.
         * @memberof tarot
         * @classdesc Represents a TarotRepo.
         * @implements ITarotRepo
         * @constructor
         * @param {tarot.ITarotRepo=} [properties] Properties to set
         */
        function TarotRepo(properties) {
            this.majors = [];
            this.minors = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * TarotRepo majors.
         * @member {Array.<tarot.ICard>} majors
         * @memberof tarot.TarotRepo
         * @instance
         */
        TarotRepo.prototype.majors = $util.emptyArray;

        /**
         * TarotRepo minors.
         * @member {Array.<tarot.IMinorCardGroup>} minors
         * @memberof tarot.TarotRepo
         * @instance
         */
        TarotRepo.prototype.minors = $util.emptyArray;

        /**
         * Creates a new TarotRepo instance using the specified properties.
         * @function create
         * @memberof tarot.TarotRepo
         * @static
         * @param {tarot.ITarotRepo=} [properties] Properties to set
         * @returns {tarot.TarotRepo} TarotRepo instance
         */
        TarotRepo.create = function create(properties) {
            return new TarotRepo(properties);
        };

        /**
         * Encodes the specified TarotRepo message. Does not implicitly {@link tarot.TarotRepo.verify|verify} messages.
         * @function encode
         * @memberof tarot.TarotRepo
         * @static
         * @param {tarot.ITarotRepo} message TarotRepo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TarotRepo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.majors != null && message.majors.length)
                for (var i = 0; i < message.majors.length; ++i)
                    $root.tarot.Card.encode(message.majors[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.minors != null && message.minors.length)
                for (var i = 0; i < message.minors.length; ++i)
                    $root.tarot.MinorCardGroup.encode(message.minors[i], writer.uint32(/* id 11, wireType 2 =*/90).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified TarotRepo message, length delimited. Does not implicitly {@link tarot.TarotRepo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof tarot.TarotRepo
         * @static
         * @param {tarot.ITarotRepo} message TarotRepo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TarotRepo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a TarotRepo message from the specified reader or buffer.
         * @function decode
         * @memberof tarot.TarotRepo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {tarot.TarotRepo} TarotRepo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TarotRepo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.tarot.TarotRepo();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.majors && message.majors.length))
                        message.majors = [];
                    message.majors.push($root.tarot.Card.decode(reader, reader.uint32()));
                    break;
                case 11:
                    if (!(message.minors && message.minors.length))
                        message.minors = [];
                    message.minors.push($root.tarot.MinorCardGroup.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a TarotRepo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof tarot.TarotRepo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {tarot.TarotRepo} TarotRepo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TarotRepo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a TarotRepo message.
         * @function verify
         * @memberof tarot.TarotRepo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        TarotRepo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.majors != null && message.hasOwnProperty("majors")) {
                if (!Array.isArray(message.majors))
                    return "majors: array expected";
                for (var i = 0; i < message.majors.length; ++i) {
                    var error = $root.tarot.Card.verify(message.majors[i]);
                    if (error)
                        return "majors." + error;
                }
            }
            if (message.minors != null && message.hasOwnProperty("minors")) {
                if (!Array.isArray(message.minors))
                    return "minors: array expected";
                for (var i = 0; i < message.minors.length; ++i) {
                    var error = $root.tarot.MinorCardGroup.verify(message.minors[i]);
                    if (error)
                        return "minors." + error;
                }
            }
            return null;
        };

        /**
         * Creates a TarotRepo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof tarot.TarotRepo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {tarot.TarotRepo} TarotRepo
         */
        TarotRepo.fromObject = function fromObject(object) {
            if (object instanceof $root.tarot.TarotRepo)
                return object;
            var message = new $root.tarot.TarotRepo();
            if (object.majors) {
                if (!Array.isArray(object.majors))
                    throw TypeError(".tarot.TarotRepo.majors: array expected");
                message.majors = [];
                for (var i = 0; i < object.majors.length; ++i) {
                    if (typeof object.majors[i] !== "object")
                        throw TypeError(".tarot.TarotRepo.majors: object expected");
                    message.majors[i] = $root.tarot.Card.fromObject(object.majors[i]);
                }
            }
            if (object.minors) {
                if (!Array.isArray(object.minors))
                    throw TypeError(".tarot.TarotRepo.minors: array expected");
                message.minors = [];
                for (var i = 0; i < object.minors.length; ++i) {
                    if (typeof object.minors[i] !== "object")
                        throw TypeError(".tarot.TarotRepo.minors: object expected");
                    message.minors[i] = $root.tarot.MinorCardGroup.fromObject(object.minors[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a TarotRepo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof tarot.TarotRepo
         * @static
         * @param {tarot.TarotRepo} message TarotRepo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        TarotRepo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults) {
                object.majors = [];
                object.minors = [];
            }
            if (message.majors && message.majors.length) {
                object.majors = [];
                for (var j = 0; j < message.majors.length; ++j)
                    object.majors[j] = $root.tarot.Card.toObject(message.majors[j], options);
            }
            if (message.minors && message.minors.length) {
                object.minors = [];
                for (var j = 0; j < message.minors.length; ++j)
                    object.minors[j] = $root.tarot.MinorCardGroup.toObject(message.minors[j], options);
            }
            return object;
        };

        /**
         * Converts this TarotRepo to JSON.
         * @function toJSON
         * @memberof tarot.TarotRepo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TarotRepo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return TarotRepo;
    })();

    tarot.Card = (function() {

        /**
         * Properties of a Card.
         * @memberof tarot
         * @interface ICard
         * @property {string|null} [index] Card index
         * @property {string|null} [name] Card name
         * @property {string|null} [meaning] Card meaning
         */

        /**
         * Constructs a new Card.
         * @memberof tarot
         * @classdesc Represents a Card.
         * @implements ICard
         * @constructor
         * @param {tarot.ICard=} [properties] Properties to set
         */
        function Card(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Card index.
         * @member {string} index
         * @memberof tarot.Card
         * @instance
         */
        Card.prototype.index = "";

        /**
         * Card name.
         * @member {string} name
         * @memberof tarot.Card
         * @instance
         */
        Card.prototype.name = "";

        /**
         * Card meaning.
         * @member {string} meaning
         * @memberof tarot.Card
         * @instance
         */
        Card.prototype.meaning = "";

        /**
         * Creates a new Card instance using the specified properties.
         * @function create
         * @memberof tarot.Card
         * @static
         * @param {tarot.ICard=} [properties] Properties to set
         * @returns {tarot.Card} Card instance
         */
        Card.create = function create(properties) {
            return new Card(properties);
        };

        /**
         * Encodes the specified Card message. Does not implicitly {@link tarot.Card.verify|verify} messages.
         * @function encode
         * @memberof tarot.Card
         * @static
         * @param {tarot.ICard} message Card message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Card.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.index != null && Object.hasOwnProperty.call(message, "index"))
                writer.uint32(/* id 10, wireType 2 =*/82).string(message.index);
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                writer.uint32(/* id 20, wireType 2 =*/162).string(message.name);
            if (message.meaning != null && Object.hasOwnProperty.call(message, "meaning"))
                writer.uint32(/* id 30, wireType 2 =*/242).string(message.meaning);
            return writer;
        };

        /**
         * Encodes the specified Card message, length delimited. Does not implicitly {@link tarot.Card.verify|verify} messages.
         * @function encodeDelimited
         * @memberof tarot.Card
         * @static
         * @param {tarot.ICard} message Card message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Card.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Card message from the specified reader or buffer.
         * @function decode
         * @memberof tarot.Card
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {tarot.Card} Card
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Card.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.tarot.Card();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 10:
                    message.index = reader.string();
                    break;
                case 20:
                    message.name = reader.string();
                    break;
                case 30:
                    message.meaning = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Card message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof tarot.Card
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {tarot.Card} Card
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Card.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Card message.
         * @function verify
         * @memberof tarot.Card
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Card.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.index != null && message.hasOwnProperty("index"))
                if (!$util.isString(message.index))
                    return "index: string expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.meaning != null && message.hasOwnProperty("meaning"))
                if (!$util.isString(message.meaning))
                    return "meaning: string expected";
            return null;
        };

        /**
         * Creates a Card message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof tarot.Card
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {tarot.Card} Card
         */
        Card.fromObject = function fromObject(object) {
            if (object instanceof $root.tarot.Card)
                return object;
            var message = new $root.tarot.Card();
            if (object.index != null)
                message.index = String(object.index);
            if (object.name != null)
                message.name = String(object.name);
            if (object.meaning != null)
                message.meaning = String(object.meaning);
            return message;
        };

        /**
         * Creates a plain object from a Card message. Also converts values to other types if specified.
         * @function toObject
         * @memberof tarot.Card
         * @static
         * @param {tarot.Card} message Card
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Card.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.index = "";
                object.name = "";
                object.meaning = "";
            }
            if (message.index != null && message.hasOwnProperty("index"))
                object.index = message.index;
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.meaning != null && message.hasOwnProperty("meaning"))
                object.meaning = message.meaning;
            return object;
        };

        /**
         * Converts this Card to JSON.
         * @function toJSON
         * @memberof tarot.Card
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Card.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Card;
    })();

    tarot.MinorCardGroup = (function() {

        /**
         * Properties of a MinorCardGroup.
         * @memberof tarot
         * @interface IMinorCardGroup
         * @property {string|null} [groupName] MinorCardGroup groupName
         * @property {string|null} [groupMeaning] MinorCardGroup groupMeaning
         * @property {Array.<tarot.ICard>|null} [cards] MinorCardGroup cards
         */

        /**
         * Constructs a new MinorCardGroup.
         * @memberof tarot
         * @classdesc Represents a MinorCardGroup.
         * @implements IMinorCardGroup
         * @constructor
         * @param {tarot.IMinorCardGroup=} [properties] Properties to set
         */
        function MinorCardGroup(properties) {
            this.cards = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * MinorCardGroup groupName.
         * @member {string} groupName
         * @memberof tarot.MinorCardGroup
         * @instance
         */
        MinorCardGroup.prototype.groupName = "";

        /**
         * MinorCardGroup groupMeaning.
         * @member {string} groupMeaning
         * @memberof tarot.MinorCardGroup
         * @instance
         */
        MinorCardGroup.prototype.groupMeaning = "";

        /**
         * MinorCardGroup cards.
         * @member {Array.<tarot.ICard>} cards
         * @memberof tarot.MinorCardGroup
         * @instance
         */
        MinorCardGroup.prototype.cards = $util.emptyArray;

        /**
         * Creates a new MinorCardGroup instance using the specified properties.
         * @function create
         * @memberof tarot.MinorCardGroup
         * @static
         * @param {tarot.IMinorCardGroup=} [properties] Properties to set
         * @returns {tarot.MinorCardGroup} MinorCardGroup instance
         */
        MinorCardGroup.create = function create(properties) {
            return new MinorCardGroup(properties);
        };

        /**
         * Encodes the specified MinorCardGroup message. Does not implicitly {@link tarot.MinorCardGroup.verify|verify} messages.
         * @function encode
         * @memberof tarot.MinorCardGroup
         * @static
         * @param {tarot.IMinorCardGroup} message MinorCardGroup message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MinorCardGroup.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.groupName != null && Object.hasOwnProperty.call(message, "groupName"))
                writer.uint32(/* id 10, wireType 2 =*/82).string(message.groupName);
            if (message.groupMeaning != null && Object.hasOwnProperty.call(message, "groupMeaning"))
                writer.uint32(/* id 20, wireType 2 =*/162).string(message.groupMeaning);
            if (message.cards != null && message.cards.length)
                for (var i = 0; i < message.cards.length; ++i)
                    $root.tarot.Card.encode(message.cards[i], writer.uint32(/* id 30, wireType 2 =*/242).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified MinorCardGroup message, length delimited. Does not implicitly {@link tarot.MinorCardGroup.verify|verify} messages.
         * @function encodeDelimited
         * @memberof tarot.MinorCardGroup
         * @static
         * @param {tarot.IMinorCardGroup} message MinorCardGroup message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MinorCardGroup.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MinorCardGroup message from the specified reader or buffer.
         * @function decode
         * @memberof tarot.MinorCardGroup
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {tarot.MinorCardGroup} MinorCardGroup
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MinorCardGroup.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.tarot.MinorCardGroup();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 10:
                    message.groupName = reader.string();
                    break;
                case 20:
                    message.groupMeaning = reader.string();
                    break;
                case 30:
                    if (!(message.cards && message.cards.length))
                        message.cards = [];
                    message.cards.push($root.tarot.Card.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a MinorCardGroup message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof tarot.MinorCardGroup
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {tarot.MinorCardGroup} MinorCardGroup
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MinorCardGroup.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MinorCardGroup message.
         * @function verify
         * @memberof tarot.MinorCardGroup
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MinorCardGroup.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.groupName != null && message.hasOwnProperty("groupName"))
                if (!$util.isString(message.groupName))
                    return "groupName: string expected";
            if (message.groupMeaning != null && message.hasOwnProperty("groupMeaning"))
                if (!$util.isString(message.groupMeaning))
                    return "groupMeaning: string expected";
            if (message.cards != null && message.hasOwnProperty("cards")) {
                if (!Array.isArray(message.cards))
                    return "cards: array expected";
                for (var i = 0; i < message.cards.length; ++i) {
                    var error = $root.tarot.Card.verify(message.cards[i]);
                    if (error)
                        return "cards." + error;
                }
            }
            return null;
        };

        /**
         * Creates a MinorCardGroup message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof tarot.MinorCardGroup
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {tarot.MinorCardGroup} MinorCardGroup
         */
        MinorCardGroup.fromObject = function fromObject(object) {
            if (object instanceof $root.tarot.MinorCardGroup)
                return object;
            var message = new $root.tarot.MinorCardGroup();
            if (object.groupName != null)
                message.groupName = String(object.groupName);
            if (object.groupMeaning != null)
                message.groupMeaning = String(object.groupMeaning);
            if (object.cards) {
                if (!Array.isArray(object.cards))
                    throw TypeError(".tarot.MinorCardGroup.cards: array expected");
                message.cards = [];
                for (var i = 0; i < object.cards.length; ++i) {
                    if (typeof object.cards[i] !== "object")
                        throw TypeError(".tarot.MinorCardGroup.cards: object expected");
                    message.cards[i] = $root.tarot.Card.fromObject(object.cards[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a MinorCardGroup message. Also converts values to other types if specified.
         * @function toObject
         * @memberof tarot.MinorCardGroup
         * @static
         * @param {tarot.MinorCardGroup} message MinorCardGroup
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MinorCardGroup.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.cards = [];
            if (options.defaults) {
                object.groupName = "";
                object.groupMeaning = "";
            }
            if (message.groupName != null && message.hasOwnProperty("groupName"))
                object.groupName = message.groupName;
            if (message.groupMeaning != null && message.hasOwnProperty("groupMeaning"))
                object.groupMeaning = message.groupMeaning;
            if (message.cards && message.cards.length) {
                object.cards = [];
                for (var j = 0; j < message.cards.length; ++j)
                    object.cards[j] = $root.tarot.Card.toObject(message.cards[j], options);
            }
            return object;
        };

        /**
         * Converts this MinorCardGroup to JSON.
         * @function toJSON
         * @memberof tarot.MinorCardGroup
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MinorCardGroup.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return MinorCardGroup;
    })();

    return tarot;
})();

module.exports = $root;
