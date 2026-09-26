// word.js - 単語データおよびローカルストレージ・成績集計管理ロジック

const DEFAULT_WORDS = [
    {
        id: 1001,
        word: "propose",
        meaning: "~を提案する,申し込む",
        examples: [
            { id: 10011, sentence: "[propose] a new program", translation: "新しい計画を提案する" },
            { id: 10012, sentence: "get down on my knee to [propose] to her", translation: "片膝ついて彼女にプロポーズする" }
        ]
    },
    {
        id: 1002,
        word: "dismiss",
        meaning: "~を避ける,~を解雇する",
        examples: [
            { id: 10021, sentence: "[dismiss] his proposal as unrealistic", translation: "非現実として彼の提案を退ける" },
            { id: 10022, sentence: "[dismiss] the employees", translation: "従業員を解雇する" }
        ]
    },
    {
        id: 1003,
        word: "bless",
        meaning: "~を祝福する",
        examples: [
            { id: 10031, sentence: "(God) [bless] you", translation: "お大事に" }
        ]
    },
    {
        id: 1004,
        word: "glory",
        meaning: "栄光",
        examples: [
            { id: 10041, sentence: "his [glory] days as a college basketball star", translation: "大学バスケットボールのスター選手としての彼の栄光の日々" }
        ]
    },
    {
        id: 1005,
        word: "compliment",
        meaning: "褒め言葉,~を褒める",
        examples: [
            { id: 10051, sentence: "[compliments] on his shoes", translation: "彼の靴への褒め言葉" },
            { id: 10052, sentence: "[compliment] her on her new hairstyle", translation: "新しい髪型について彼女を褒める" }
        ]
    },
    {
        id: 1006,
        word: "feast",
        meaning: "宴会,とても楽しいこと,喜ばせるもの",
        examples: [
            { id: 10061, sentence: "the wedding [feast]", translation: "結婚式の宴" },
            { id: 10062, sentence: "This movie festival is a [feast] for cinema-goers .", translation: "この映画祭は映画好きにはたまらない." }
        ]
    },
    {
        id: 1007,
        word: "declare",
        meaning: "~を宣言する,~を申告する",
        examples: [
            { id: 10071, sentence: "He [declared] that he was innocent.", translation: "彼は無実だとはっきり述べた" },
            { id: 10072, sentence: "Do you have anything to [declare]?", translation: "申告するものはありますか." }
        ]
    },
    {
        id: 1008,
        word: "highlight",
        meaning: "強調する,呼び物,見どころ",
        examples: [
            { id: 10081, sentence: "[highlight] the issue of global warming", translation: "地球温暖化の問題を強調する" },
            { id: 10082, sentence: "the [highlight] of the show", translation: "そのショーの見所" }
        ]
    },
    {
        id: 1009,
        word: "imply",
        meaning: "~をほのめかす,~を意味する",
        examples: [
            { id: 10091, sentence: "Alex [implied] that he would resign.", translation: "アレックスは辞意をほのめかした" }
        ]
    },
    {
        id: 1010,
        word: "recite",
        meaning: "~を暗証する",
        examples: [
            { id: 10101, sentence: "[recite] a poem", translation: "詩を暗証する" }
        ]
    },
    {
        id: 1011,
        word: "ray",
        meaning: "光線,放射線,わずかな",
        examples: [
            { id: 10111, sentence: "the sun's [rays]", translation: "太陽光線" },
            { id: 10112, sentence: "take an X-[ray] (examination)", translation: "レントゲン(Ｘ線)検査を受ける" },
            { id: 10113, sentence: "a [rays] of hope", translation: "一縷の望み" }
        ]
    },
    {
        id: 1012,
        word: "radiation",
        meaning: "放射線",
        examples: [
            { id: 10121, sentence: "The workers were exposed to [radiation].", translation: "その労働者たちは被爆した(放射線にさらされた)." }
        ]
    },
    {
        id: 1013,
        word: "laboratory",
        meaning: "研究室",
        examples: [
            { id: 10131, sentence: "[laboratory] experiments", translation: "研究室での実験" }
        ]
    },
    {
        id: 1014,
        word: "oxygen",
        meaning: "酸素",
        examples: [
            { id: 10141, sentence: "Water is made up of [oxygen] and hydrogen.", translation: "水は酸素と水素からできている." }
        ]
    },
    {
        id: 1015,
        word: "molecule",
        meaning: "分子",
        examples: [
            { id: 10151, sentence: "a water [molecule]", translation: "水分子" }
        ]
    },
    {
        id: 1016,
        word: "compound",
        meaning: "化合物,複合的な",
        examples: [
            { id: 10161, sentence: "a chemical [compound]", translation: "化合物" },
            { id: 10162, sentence: "`Duty-free' is a [compound] word.", translation: "「免税の」は複合語だ." }
        ]
    },
    {
        id: 1017,
        word: "tissue",
        meaning: "組織,ティッシュ",
        examples: [
            { id: 10171, sentence: "nerve [tissue]", translation: "神経組織" },
            { id: 10172, sentence: "take a [tissue]", translation: "ティッシュペーパーを取る" }
        ]
    },
    {
        id: 1018,
        word: "cell",
        meaning: "細胞,電池,独房",
        examples: [
            { id: 10181, sentence: "remove the cancerous [cells]", translation: "がん細胞を除去する" },
            { id: 10182, sentence: "a fuel [cell]", translation: "燃料電池" },
            { id: 10183, sentence: "spend a week in a [cell]", translation: "独房で1週間過ごす" }
        ]
    },
    {
        id: 1019,
        word: "gene",
        meaning: "遺伝子",
        examples: [
            { id: 10191, sentence: "the [gene] for black hair", translation: "黒い髪の遺伝子" }
        ]
    },
    {
        id: 1020,
        word: "substance",
        meaning: "物質,本質,根拠",
        examples: [
            { id: 10201, sentence: "a cancer-causing [substance]", translation: "発がん性物質" },
            { id: 10202, sentence: "a rumor with no [substance]", translation: "根拠のないうわさ" }
        ]
    },
    {
        id: 1021,
        word: "solid",
        meaning: "固体,ぎっしり詰まった,純金",
        examples: [
            { id: 10211, sentence: "[solid] fuel", translation: "固体燃料" },
            { id: 10212, sentence: "[solid] gold", translation: "純金(ぎっしり詰まった金)" },
            { id: 10213, sentence: "change from [solids] to liquids", translation: "固体から液体に変化する" }
        ]
    },
    {
        id: 1022,
        word: "satellite",
        meaning: "衛星,人造衛星",
        examples: [
            { id: 10221, sentence: "Jupiter's sixth [satellite]", translation: "木星の6番目の衛星" },
            { id: 10222, sentence: "a communications [satellite]", translation: "通信衛星" }
        ]
    },
    {
        id: 1023,
        word: "orbit",
        meaning: "軌道,惑星などが~を周回する",
        examples: [
            { id: 10231, sentence: "the moon's [orbit] around the earth", translation: "地球を回る月の軌道" },
            { id: 10232, sentence: "the earth takes one year to [orbit] the sun.", translation: "地球は太陽の周りを1年で1周する." }
        ]
    },
    {
        id: 1024,
        word: "launch",
        meaning: "打ち上げ,開始,発売,~を打ち上げる,始める",
        examples: [
            { id: 10241, sentence: "[launch] a Sun probe", translation: "太陽探査機を打ち上げる" },
            { id: 10242, sentence: "[launch] a campaign against smoking", translation: "禁煙運動を始める" },
            { id: 10243, sentence: "the [launch] of a new product", translation: "新製品の発売" }
        ]
    },
    {
        id: 1025,
        word: "attempt",
        meaning: "試み,~を試みる",
        examples: [
            { id: 10251, sentence: "make an [attempt] to break his record", translation: "彼の記録を破ろうと試みる" },
            { id: 10252, sentence: "[attempt] to escape", translation: "逃げようと試みる" }
        ]
    },
    {
        id: 1026,
        word: "capacity",
        meaning: "容量,収容力,能力",
        examples: [
            { id: 10261, sentence: "have a remarkable [capacity] to learn language", translation: "目立った言語学習能力を有している" },
            { id: 10262, sentence: "be packed to [capacity]", translation: "超満員(収容力いっぱい)で" },
            
        ]
    },
    {
        id: 1027,
        word: "capable",
        meaning: "能力がある,有能な",
        examples: [
            { id: 10271, sentence: "This factory is [capable] of producing 100 cars per hour.", translation: "この工場では1時間に100台の車を生産できる." },
            { id: 10272, sentence: "a [capable] attorney", translation: "有能な弁護士" }
        ]
    },
    {
        id: 1028,
        word: "attain",
        meaning: "~を達成する,到達する",
        examples: [
            { id: 10281, sentence: "I have [attained] my ideal weight.", translation: "私は理想とする体重に達した." },
            { id: 10282, sentence: "[attain] the age of 18", translation: "18歳になる" }
        ]
    },
    {
        id: 1029,
        word: "desperate",
        meaning: "必死の,状況が絶望的な",
        examples: [
            { id: 10291, sentence: "make a [desperate] effort to succeed", translation: "成功するために必死の努力をする" },
            { id: 10292, sentence: "a [desperate] shortage of water", translation: "絶望的な水不足" }
        ]
    },
    {
        id: 1030,
        word: "dedicate",
        meaning: "~を捧げる",
        examples: [
            { id: 10301, sentence: "She [dedicated] herself to her work.", translation: "彼女は仕事に没頭した(仕事に自分自身を捧げた)." }
        ]
    },
    {
        id: 1031,
        word: "pain",
        meaning: "苦痛,苦労",
        examples: [
            { id: 10311, sentence: "Do you feel any [pain]?", translation: "医者の発言「痛みはありますか」" },
            { id: 10312, sentence: "take [pains] to improve my image", translation: "イメージアップに苦心する" }
        ]
    },
    {
        id: 1032,
        word: "strain",
        meaning: "心身の負担,無理,~を痛める,負担を強いる",
        examples: [
            { id: 10321, sentence: "work under a lot of [strain]", translation: "過度の負担の下で働く" },
            { id: 10322, sentence: "[strain] a muscle in my leg", translation: "足の筋肉を痛める" }
        ]
    },
    {
        id: 1033,
        word: "remedy",
        meaning: "治療法,治療薬,改善策,対策",
        examples: [
            { id: 10331, sentence: "a [remedy] for colds", translation: "かぜの治療法" },
            { id: 10332, sentence: "a [remedy] for unemployment", translation: "失業対策" }
        ]
    },
    {
        id: 1034,
        word: "pharmacy",
        meaning: "調剤局,薬局",
        examples: [
            { id: 10341, sentence: "buy medicine at a nearby [pharmacy]", translation: "近くの薬局で薬を買う" }
        ]
    },
    {
        id: 1035,
        word: "physician",
        meaning: "医師,内科医",
        examples: [
            { id: 10351, sentence: "emergency [physicians]", translation: "救急医" },
            { id: 10352, sentence: "the Royal college of [Physicians]", translation: "英国王立内科医協会" }
        ]
    },
    {
        id: 1036,
        word: "disorder",
        meaning: "心身の不調,精神疾患,消化不良など",
        examples: [
            { id: 10361, sentence: "eating [disorders]", translation: "摂食障害" }
        ]
    },
    {
        id: 1037,
        word: "pregnant",
        meaning: "妊娠した",
        examples: [
            { id: 10371, sentence: "Terry is three-months [pregnant].", translation: "テリーは妊娠3か月だ." }
        ]
    },
    {
        id: 1038,
        word: "clinical",
        meaning: "臨床の",
        examples: [
            { id: 10381, sentence: "clinical test", translation: "臨床試験" }
        ]
    },
    {
        id: 1039,
        word: "heal",
        meaning: "~を治す,治る",
        examples: [
            { id: 10391, sentence: "[heal] people by laying my hands on their bodies", translation: "体に手を当てて人々を治す" },
            { id: 10392, sentence: "The injury will [heal] quickly.", translation: "傷はすぐに治るだろう." }
        ]
    },
    {
        id: 1040,
        word: "infect",
        meaning: "人,動物,地域に感染させる,伝染する",
        examples: [
            { id: 10401, sentence: "My dog was [infected] with a virus.", translation: "うちのイヌはウイルスに感染した(感染させられた)." }
        ]
    },
    {
        id: 1041,
        word: "ankle",
        meaning: "足首",
        examples: [
            { id: 10411, sentence: "twist my [ankle]", translation: "足首をひねる" }
        ]
    },
    {
        id: 1042,
        word: "thumb",
        meaning: "親指",
        examples: [
            { id: 10421, sentence: "stick up my [thumb]", translation: "親指を立てる" }
        ]
    },
    {
        id: 1043,
        word: "forehead",
        meaning: "額,おでこ",
        examples: [
            { id: 10431, sentence: "I've got a [pimple] on my forehead.", translation: "(私のお)でこにニキビができてきた." }
        ]
    },
    {
        id: 1044,
        word: "chin",
        meaning: "下あご,あごの先端",
        examples: [
            { id: 10441, sentence: "stick out my [chin]", translation: "あごを突き出す" }
        ]
    },
    {
        id: 1045,
        word: "chest",
        meaning: "胸,部,大きな木箱,密閉容器",
        examples: [
            { id: 10451, sentence: "have a [chest] X-ray examination", translation: "胸部のレントゲン検査を受ける" },
            { id: 10452, sentence: "a large wooden [chest]", translation: "大きな木製の箱" }
        ]
    },
    {
        id: 1046,
        word: "breast",
        meaning: "おもに女性の胸,乳房",
        examples: [
            { id: 10461, sentence: "early detection of [breast] cancer", translation: "乳がんの早期発見" }
        ]
    },
    {
        id: 1047,
        word: "lung",
        meaning: "肺",
        examples: [
            { id: 10471, sentence: "the heart and the [lungs]", translation: "(ヒトの)心臓と肺" }
        ]
    },
    {
        id: 1048,
        word: "organ",
        meaning: "臓器,動物の器官,楽器オルガン",
        examples: [
            { id: 10481, sentence: "wait for an [organ] transplant", translation: "臓器移植を待つ" },
            { id: 10482, sentence: "play the [organ]", translation: "オルガンを弾く" }
        ]
    },
    {
        id: 1049,
        word: "vision",
        meaning: "視力,視野,未来像,未来を見通す力,先見の明",
        examples: [
            { id: 10491, sentence: "have good [vision]", translation: "視力が良い" },
            { id: 10492, sentence: "his [vision] for Japan's future", translation: "日本の未来の彼の予想図" },
            { id: 10493, sentence: "a leader with [vision]", translation: "先見の明のある指導者" }
        ]
    },
    {
        id: 1050,
        word: "skeleton",
        meaning: "骸骨,骨格",
        examples: [
            { id: 10501, sentence: "a model of the human [skeleton]", translation: "ヒトの骸骨の模型" }
        ]
    },
    {
        id: 1051,
        word: "sensation",
        meaning: "感覚,説明し難い感情",
        examples: [
            { id: 10511, sentence: "lose all [sensation] in my toes", translation: "足の指先の感覚がなくなる" },
            { id: 10512, sentence: "I had the [sensation] that I was being followed.", translation: "後をつけられているのではないかという気がした." }
        ]
    },
    {
        id: 1052,
        word: "code",
        meaning: "服装などの規定,暗号,書かれたもの",
        examples: [
            { id: 10521, sentence: "Does the restaurant have a dress [code]?", translation: "そのレストランには服装規定はありますか." },
            { id: 10522, sentence: "write in [code]", translation: "暗号で書く" }
        ]
    },
    {
        id: 1053,
        word: "agenda",
        meaning: "協議事項,会議などの議題一覧",
        examples: [
            { id: 10531, sentence: "the [agenda] for today's meeting", translation: "本日の会議の議題" }
        ]
    },
    {
        id: 1054,
        word: "liberty",
        meaning: "自由",
        examples: [
            { id: 10541, sentence: "fight for [liberty] and equality", translation: "自由と平等のために戦う" }
        ]
    },
    {
        id: 1055,
        word: "committee",
        meaning: "委員会",
        examples: [
            { id: 10551, sentence: "the International Olympic [Committee]", translation: "国際オリンピック委員会" }
        ]
    },
    {
        id: 1056,
        word: "humanity",
        meaning: "人類,人類愛,文系の人文科学,人間性あふれる教師",
        examples: [
            { id: 10561, sentence: "a crime against [humanity]", translation: "人類に対する犯罪" },
            { id: 10562, sentence: "a student of the [humanities]", translation: "文系の学生" },
            { id: 10563, sentence: "a teacher of deep [humanity]", translation: "人間性あふれる教師" }
        ]
    },
    {
        id: 1057,
        word: "mankind",
        meaning: "集合的に人類",
        examples: [
            { id: 10571, sentence: "in the history of [mankind]", translation: "人類の歴史において" }
        ]
    },
    {
        id: 1058,
        word: "authority",
        meaning: "権威,権力,当局",
        examples: [
            { id: 10581, sentence: "an [authority] on orthodontics", translation: "歯科矯正学の権威" },
            { id: 10582, sentence: "someone in [authority]", translation: "権力のある人" },
            { id: 10583, sentence: "the school [authorities]", translation: "学校当局" }
        ]
    },
    {
        id: 1059,
        word: "justice",
        meaning: "正義,公平で道徳的,法的に正しいこと",
        examples: [
            { id: 10591, sentence: "have a strong sense of [justice]", translation: "正義感が強い" }
        ]
    },
    {
        id: 1060,
        word: "insurance",
        meaning: "保険",
        examples: [
            { id: 10601, sentence: "have health [insurance]", translation: "健康保険に入っている" }
        ]
    },
    {
        id: 1061,
        word: "hardship",
        meaning: "苦難",
        examples: [
            { id: 10611, sentence: "suffer financial [hardship]", translation: "お金で苦労する(経済的苦難に苦しむ)" }
        ]
    },
    {
        id: 1062,
        word: "poverty",
        meaning: "貧困",
        examples: [
            { id: 10621, sentence: "live below the [poverty] line", translation: "最低(貧困)水準以下の暮らしをする" }
        ]
    },
    {
        id: 1063,
        word: "chaos",
        meaning: "大混乱,混沌",
        examples: [
            { id: 10631, sentence: "The kitchen is in [chaos].", translation: "台所がめちゃくちゃだ(大混乱だ)." }
        ]
    },
    {
        id: 1064,
        word: "isolation",
        meaning: "孤立,分離,孤独感",
        examples: [
            { id: 10641, sentence: "in [isolation] from society", translation: "社会から孤立して" }
        ]
    },
    {
        id: 1065,
        word: "region",
        meaning: "地域",
        examples: [
            { id: 10651, sentence: "a wine-producing [region]", translation: "ワインの生産地域" }
        ]
    },
    {
        id: 1066,
        word: "proof",
        meaning: "証拠,証明,(複合語で)~を防ぐ",
        examples: [
            { id: 10661, sentence: "There is no [proof] that she was at home at that time.", translation: "彼女がその時家ににいたという証拠はない." },
            { id: 10662, sentence: "a [waterproof] watch", translation: "防水の腕時計" }
        ]
    },
    {
        id: 1067,
        word: "warranty",
        meaning: "保証",
        examples: [
            { id: 10671, sentence: "My microwave oven was under [warranty], so the repair was free.", translation: "私の電子レンジは保証期間中だったので,修理は無料だった." }
        ]
    },
    {
        id: 1068,
        word: "principle",
        meaning: "原理,原則,主義,信念",
        examples: [
            { id: 10681, sentence: "in [principle]", translation: "原則的には" },
            { id: 10682, sentence: "a guiding [principle] in my life", translation: "人生の指針となる信念" }
        ]
    },
    {
        id: 1069,
        word: "origin",
        meaning: "起源",
        examples: [
            { id: 10691, sentence: "the [origin] of life on Earth", translation: "地球上の生命の起源" }
        ]
    },
    {
        id: 1070,
        word: "setting",
        meaning: "環境,状況,小説などの設定,舞台",
        examples: [
            { id: 10701, sentence: "a perfect [setting] for a picnic", translation: "ピクニックにはうってつけの環境" },
            { id: 10702, sentence: "the [setting] for the novel", translation: "その小説の舞台" }
        ]
    },
    {
        id: 1071,
        word: "mission",
        meaning: "任務,使命,使節団",
        examples: [
            { id: 10711, sentence: "a [mission] to Saturn", translation: "土星への(飛行)任務" },
            { id: 10712, sentence: "dispatch a [mission] to North Korea", translation: "北朝鮮へ使節団を派遣する" },
            { id: 10713, sentence: "a Christian [mission]", translation: "キリスト教の布教" }
        ]
    },
    {
        id: 1072,
        word: "project",
        meaning: "計画,企画,予算などを見積もる,を投影する",
        examples: [
            { id: 10721, sentence: "the outline of the new [project]", translation: "新企画の概要" },
            { id: 10722, sentence: "The cost was [projected] to be 100 million dollars.", translation: "費用は1億円と見積もられた." },
            { id: 10723, sentence: "be [projected] onto a big screen", translation: "大きなスクリーンに映し出される" }
        ]
    },
    {
        id: 1073,
        word: "monument",
        meaning: "記念碑,遺跡,史跡",
        examples: [
            { id: 10731, sentence: "put up a [monument]", translation: "記念碑を建てる" }
        ]
    },
    {
        id: 1074,
        word: "revolution",
        meaning: "革命",
        examples: [
            { id: 10741, sentence: "a [revolution] in health care", translation: "医療の改革" }
        ]
    },
    {
        id: 1075,
        word: "contract",
        meaning: "契約,~を契約する,病気に感染する",
        examples: [
            { id: 10751, sentence: "sign a [contract] with the team", translation: "そのチームと契約をする" },
            { id: 10752, sentence: "[contract] a loan", translation: "ローンを契約する" },
            { id: 10753, sentence: "[contract] a killer virus", translation: "致死ウイルスに感染する" }
        ]
    },
    {
        id: 1076,
        word: "infrastructure",
        meaning: "インフラ,基幹施設",
        examples: [
            { id: 10761, sentence: "improve the tourism [infrastructure]", translation: "観光インフラを整備する" }
        ]
    },
    {
        id: 1077,
        word: "negotiate",
        meaning: "~と交渉する",
        examples: [
            { id: 10771, sentence: "[negotiate] with kidnappers", translation: "誘拐犯と交渉する" },
            { id: 10772, sentence: "[negotiate] a trade agreement", translation: "貿易協定を取り決める" }
        ]
    },
    {
        id: 1078,
        word: "cooperate",
        meaning: "~と協力する",
        examples: [
            { id: 10781, sentence: "We all [cooperated] in preparing for the cultural festival.", translation: "私たち全員で協力して文化祭の準備をした." }
        ]
    },
    {
        id: 1079,
        word: "restore",
        meaning: "治安などを回復する,古い建物,絵などを修理する",
        examples: [
            { id: 10791, sentence: "[restore] peace in the Middle East", translation: "中東で平和を回復する" },
            { id: 10792, sentence: "[restore] the old church", translation: "その古い教会を修復する" }
        ]
    },
    {
        id: 1080,
        word: "found",
        meaning: "~を創立する",
        examples: [
            { id: 10801, sentence: "Our school was [founded] in 1918.", translation: "我が校は1918年に創立された." }
        ]
    },
    {
        id: 1081,
        word: "conservative",
        meaning: "保守的な",
        examples: [
            { id: 10811, sentence: "the [Conservative] Party", translation: "保守党" }
        ]
    },
    {
        id: 1082,
        word: "affair",
        meaning: "事柄,情勢,スキャンダラスな事件,情事,浮気",
        examples: [
            { id: 10821, sentence: "international [affairs]", translation: "国際情勢" },
            { id: 10822, sentence: "the spy [affair]", translation: "スパイ事件" },
            { id: 10823, sentence: "a triangular love [affair]", translation: "男女の三角関係(三角形の情事)" }
        ]
    },
    {
        id: 1083,
        word: "agency",
        meaning: "政府機関,代理店",
        examples: [
            { id: 10831, sentence: "the Central Intelligence [Agency] (CIA)", translation: "アメリカ中央情報局(CIA)" },
            { id: 10832, sentence: "a travel [agency]", translation: "旅行代理店" }
        ]
    },
    {
        id: 1084,
        word: "council",
        meaning: "議会",
        examples: [
            { id: 10841, sentence: "the city [council]", translation: "市議会" }
        ]
    },
    {
        id: 1085,
        word: "kingdom",
        meaning: "王国,社会",
        examples: [
            { id: 10851, sentence: "the animal [kingdom]", translation: "動物界" },
            { id: 10852, sentence: "the United [Kingdom]", translation: "連合王国(=英国)" }
        ]
    },
    {
        id: 1086,
        word: "republic",
        meaning: "共和国",
        examples: [
            { id: 10861, sentence: "the People's [Republic] of China", translation: "中華人民共和国" }
        ]
    },
    {
        id: 1087,
        word: "empire",
        meaning: "帝国",
        examples: [
            { id: 10871, sentence: "the fall of the Roman [Empire]", translation: "ローマ帝国の崩壊" }
        ]
    },
    {
        id: 1088,
        word: "aid",
        meaning: "援助,救援物資",
        examples: [
            { id: 10881, sentence: "give economic [aid] to developing countries", translation: "発展途上国へ経済援助を行う" }
        ]
    },
    {
        id: 1089,
        word: "reform",
        meaning: "改革,~を改革する",
        examples: [
            { id: 10891, sentence: "the government's educational [reform](s)", translation: "政府の教育改革" }
        ]
    },
    {
        id: 1090,
        word: "minister",
        meaning: "大臣,牧師",
        examples: [
            { id: 10901, sentence: "the foreign [minister]", translation: "外務大臣" },
            { id: 10902, sentence: "a Baptist minister", translation: "バプテスト派の牧師" }
        ]
    },
    {
        id: 1091,
        word: "parliament",
        meaning: "議会",
        examples: [
            { id: 10911, sentence: "summon a [parliament]", translation: "議会を招集する" }
        ]
    },
    {
        id: 1092,
        word: "territory",
        meaning: "領土,動物などの縄張り,学問などの領域",
        examples: [
            { id: 10921, sentence: "the issue of the Northern [Territories]", translation: "北方領土問題" },
            { id: 10922, sentence: "Dogs use urine to mark their [territory].", translation: "イヌはオシッコをすることで自分の縄張りを示す." }
        ]
    },
    {
        id: 1093,
        word: "poll",
        meaning: "政治関連の世論調査,投票,~票を得る",
        examples: [
            { id: 10931, sentence: "recent opinion [polls]", translation: "最近の世論調査" },
            { id: 10932, sentence: "go to the [polls]", translation: "投票に行く" },
            { id: 10933, sentence: "[poll] 30,000 votes", translation: "3万票を獲得する" }
        ]
    },
    {
        id: 1094,
        word: "fortune",
        meaning: "財産,幸運",
        examples: [
            { id: 10941, sentence: "make a [fortune] in real estate", translation: "不動産で財産を作る" },
            { id: 10942, sentence: "tell his [fortune] with playing cards", translation: "トランプで彼の運勢を占う" }
        ]
    },
    {
        id: 1095,
        word: "property",
        meaning: "財産,資産,物質の特性,建物を含む",
        examples: [
            { id: 10951, sentence: "intellectual [property]", translation: "知的財産" },
            { id: 10952, sentence: "the [property] of dissolving in water", translation: "水に溶ける特性" },
            { id: 10953, sentence: "a fence marking the [property]'s boundaries", translation: "所有地の境界を示す塀" }
        ]
    },
    {
        id: 1096,
        word: "fund",
        meaning: "資金,基金,~に資金を出す",
        examples: [
            { id: 10961, sentence: "manage [funds] effectively", translation: "資金を有効に活用する" },
            { id: 10962, sentence: "the International Monetary [Fund]", translation: "国際通貨基金(IMF)" },
            { id: 10963, sentence: "The museum is [funded] by local people.", translation: "その博物館は地元民が資金を出し合って(運営して)いる" }
        ]
    },
    {
        id: 1097,
        word: "stock",
        meaning: "株(式),在庫品,蓄え",
        examples: [
            { id: 10971, sentence: "make money on the [stock] market", translation: "株(式市場)でもうける" },
            { id: 10972, sentence: "goods in [stock]", translation: "在庫品" }
        ]
    },
    {
        id: 1098,
        word: "labor",
        meaning: "労働,労働者,努力,陣痛",
        examples: [
            { id: 10981, sentence: "manual [labor]", translation: "肉体労働" },
            { id: 10982, sentence: "skilled [labor]", translation: "熟練した労働者" },
            { id: 10983, sentence: "go into [labor]", translation: "陣痛が始まる" }
        ]
    },
    {
        id: 1099,
        word: "overwork",
        meaning: "働きすぎる,酷使する,過労",
        examples: [
            { id: 10991, sentence: "stop [overworking]", translation: "働き過ぎをやめる" },
            { id: 10992, sentence: "[overworking] the employees", translation: "従業員を働かせすぎる" },
            { id: 10993, sentence: "[Overworking] made him ill.", translation: "彼は過労で病気になった." }
        ]
    },
    {
        id: 1100,
        word: "firm",
        meaning: "会社,固い,引き締まった",
        examples: [
            { id: 11001, sentence: "a law [firm]", translation: "法律事務所" },
            { id: 11002, sentence: "I am a [firm] believer in fate.", translation: "私は運命をとても強く信じている." },
            { id: 11002, sentence: "[firm] muscles", translation: "引き締まった筋肉" }   
        ]
    },
    {
        id: 1101,
        word: "union",
        meaning: "労働組合,合併,連邦",
        examples: [
            { id: 11011, sentence: "a [union] member", translation: "労働組合員" },
            { id: 11012, sentence: "a [union] of two cities", translation: "２都市の合併" },
            { id: 11013, sentence: "the former Soviet [Union]", translation: "旧ソビエト連邦" }
            
        ]
    },
    {
        id: 1102,
        word: "administration",
        meaning: "経営,運営,行政,政権",
        examples: [
            { id: 11021, sentence: "school [administration]", translation: "学校運営" },
            { id: 11022, sentence: "municipal [administration]", translation: "市政(市の行政)" },
            { id: 11023, sentence: "the Trump [administration]", translation: "トランプ政権" }
            
        ]
    },
    {
        id: 1103,
        word: "secretary",
        meaning: "秘書,米国の各省の長,事務局長",
        examples: [
            { id: 11031, sentence: "a [secretary] to the president", translation: "社長の秘書" },
            { id: 11032, sentence: "the [Secretary] General", translation: "（国連などの）事務総長" }
        ]
    },
    {
        id: 1104,
        word: "editor",
        meaning: "新聞・雑誌などの編集者,顧客集業者",
        examples: [
            { id: 11041, sentence: "the [editor] of The Japan News", translation: "『ジャパン・ニュース』の編集長" }
        ]
    },
    {
        id: 1105,
        word: "client",
        meaning: "依頼人,サービス業の取引先",
        examples: [
            { id: 11051, sentence: "The lawyer met a [client] yesterday.", translation: "その弁護士は依頼人と昨日会った。" },
            { id: 11052, sentence: "one of our oldest [clients]", translation: "最も古くからの取引先の1つ" }
        ]
    },
    {
        id: 1106,
        word: "recruit",
        meaning: "団体・組織が〜を新規採用する,新兵,新人",
        examples: [
            { id: 11061, sentence: "recruit a new band member", translation: "新規のバンドのメンバーを入れる" },
            { id: 11062, sentence: "a training camp for [recruits]", translation: "新兵訓練所" }
        ]
    },
    {
        id: 1107,
        word: "basis",
        meaning: "基礎,根拠",
        examples: [
            { id: 11071, sentence: "on the [basis] of a new theory", translation: "新しい理論を根拠にして" },
            { id: 11072, sentence: "The wages are paid on a weekly [basis].", translation: "賃金は毎週（週を基準にして）支払われる。" }
        ]
    },
    {
        id: 1108,
        word: "element",
        meaning: "最も重要な要素,化学の元素,自然の力",
        examples: [
            { id: 11081, sentence: "a key [element] of his success", translation: "彼の成功のかぎとなる要素" },
            { id: 11082, sentence: "be exposed to the [elements]", translation: "悪天候にさらされる" },
            { id: 11083, sentence: "an [element] of truth", translation: "いくらかの真理" }
        ]
    },
    {
        id: 1109,
        word: "constitute",
        meaning: "主語が複数〜を構成する,主語が単数〜である",
        examples: [
            { id: 11091, sentence: "Fifty states [constitute] the USA.", translation: "50の州が米国を構成している。" },
            { id: 11092, sentence: "The rise in internet crime [constitutes] a threat to society.", translation: "インターネット犯罪の増加は社会に対する脅威である。" }
        ]
    },
    {
        id: 1110,
        word: "unify",
        meaning: "他を統一する",
        examples: [
            { id: 11101, sentence: "[unify] the country", translation: "国を統一する" },
        ]
    },
    {
        id: 1111,
        word: "combine",
        meaning: "を結びつける,同時に行う,結びつく",
        examples: [
            { id: 11101, sentence: "[combine] a diet with exercise", translation: "国を統一する" },
            { id: 11102, sentence: "Hydrogen and oxygen [combine] to form water.", translation: "水素と酸素が結びついて水を作る." }
        ]
    },
    {
        id: 1121,
        word: "sword",
        meaning: "剣,刃物と取っ手のついた武器",
        examples: [
            { id: 11211, sentence: "a double-edged [sword]", translation: "諸刃の剣" },
            { id: 11212, sentence: "the [sword] of Damocles", translation: "ダモクレスの剣（いつ起こるか知れない危険）" }
        ]
    },
    {
        id: 1122,
        word: "wound",
        meaning: "傷,他を傷つける,戦争や争いなどによる傷",
        examples: [
            { id: 11221, sentence: "The [wound] still hurts.", translation: "傷がまだ痛む。" },
            { id: 11222, sentence: "[wounded] soldiers", translation: "傷を負った兵士たち" }
        ]
    },
    {
        id: 1123,
        word: "triumph",
        meaning: "勝利,勝利する",
        examples: [
            { id: 11231, sentence: "her [triumph] in the election", translation: "選挙での彼女の勝利" },
            { id: 11232, sentence: "Virtue always [triumphs] over vice.", translation: "徳は常に悪に勝つ。" }
        ]
    },
    {
        id: 1124,
        word: "military",
        meaning: "軍事的な,陸、海、空軍に関する",
        examples: [
            { id: 11241, sentence: "use [military] forces", translation: "軍事力を使う" },
            { id: 11242, sentence: "a strategy for winning the game", translation: "その試合に勝つための戦略" }
        ]
    },
    {
        id: 1125,
        word: "strategy",
        meaning: "戦略,計画",
        examples: [
            { id: 11251, sentence: "a [strategy] for winning the game", translation: "その試合に勝つための戦略" }
        ]
    },
    {
        id: 1126,
        word: "conquer",
        meaning: "国や地域を征服する,病気や恐怖などを克服する",
        examples: [
            { id: 11261, sentence: "The Normans [conquered] England in 1066.", translation: "1066年、ノルマン人はイングランドを征服した。" },
            { id: 11262, sentence: "conquer my fear of the dark", translation: "暗闇に対する恐怖を克服する" }
        ]
    },
    {
        id: 1127,
        word: "defend",
        meaning: "敵から守る,相手の攻撃から守る",
        examples: [
            { id: 11271, sentence: "learn karate to [defend] myself", translation: "自分の身を守るために空手を習う" },
            { id: 11272, sentence: "Donald is dominated by his wife.", translation: "ドナルドは奥さんに支配されている。" }
        ]
    },
    {
        id: 1128,
        word: "dominate",
        meaning: "他を支配する",
        examples: [
            { id: 11281, sentence: "Donald is [dominated] by his wife.", translation: "ドナルドは奥さんに支配されている。" }
        ]
    },
    {
        id: 1129,
        word: "rob",
        meaning: "銀行などを襲う,AからBを奪う",
        examples: [
            { id: 11291, sentence: "The pirates [robbed] the ship.", translation: "海賊はその船を襲った。" },
            { id: 11292, sentence: "They [robbed] her of her handbag.", translation: "彼らは彼女からハンドバッグを奪った。" }
        ]
    },
    {
        id: 1130,
        word: "deprive",
        meaning: "AからBを奪う",
        examples: [
            { id: 11301, sentence: "Diana was [deprived] of her civil rights.", translation: "ダイアナは公民権を剥奪された。" }
        ]
    },
    {
        id: 1131,
        word: "devastate",
        meaning: "町などを壊滅させる,人を打ちのめす",
        examples: [
            { id: 11311, sentence: "The city was [devastated] by a big earthquake.", translation: "その都市は大地震で壊滅された。" },
            { id: 11312, sentence: "He was [devastated] by the news of her death.", translation: "彼は彼女の死の知らせに打ちのめされた。" }
        ]
    },
    {
        id: 1132,
        word: "crash",
        meaning: "飛行機が墜落する,ものすごい勢いでぶつかる",
        examples: [
            { id: 11321, sentence: "[crash] into the barrier", translation: "ガードレールに衝突する" },
            { id: 11322, sentence: "The plane [crashed] and caught fire.", translation: "その飛行機は墜落し、炎上した。" },
            { id: 11323, sentence: "the site of the plane [crash]", translation: "飛行機の墜落現場" }
        ]
    },
    {
        id: 1133,
        word: "hazard",
        meaning: "危険,なり得ること",
        examples: [
            { id: 11331, sentence: "Steep stairs can be a [hazard] for elderly people.", translation: "急な階段は高齢者にとって危険（なもの）になり得る。" }
        ]
    },
    {
        id: 1134,
        word: "debris",
        meaning: "破片,残骸",
        examples: [
            { id: 11341, sentence: "clear space [debris]", translation: "宇宙ゴミを片付ける" }
        ]
    },
    {
        id: 1135,
        word: "orphan",
        meaning: "孤児",
        examples: [
            { id: 11351, sentence: "a war [orphan]", translation: "戦争孤児" }
        ]
    },
    {
        id: 1136,
        word: "slave",
        meaning: "奴隷",
        examples: [
            { id: 11361, sentence: "free the [slaves]", translation: "奴隷を解放する" },
            { id: 11362, sentence: "a [slave] to work", translation: "仕事の奴隷" }
        ]
    },
    {
        id: 1137,
        word: "acquaintance",
        meaning: "面識,ちょっとした知識",
        examples: [
            { id: 11371, sentence: "an old [acquaintance]", translation: "昔からの知り合い" },
            { id: 11372, sentence: "have some [acquaintance] with Latin", translation: "ラテン語を多少知っている" }
        ]
    },
    {
        id: 1138,
        word: "merchant",
        meaning: "商人",
        examples: [
            { id: 11381, sentence: "a wine [merchant]", translation: "ワイン店を営む人" }
        ]
    },
    {
        id: 1139,
        word: "resident",
        meaning: "住人,居住者",
        examples: [
            { id: 11391, sentence: "Parking spaces are for [residents] only.", translation: "駐車スペースは居住者専用です。" },
            { id: 11392, sentence: "a foreign [resident] of Japan", translation: "在日外国人" },
            { id: 11393, sentence: "be [resident] in Tokyo", translation: "東京に住んでいる" }
        ]
    },
    {
        id: 1140,
        word: "crew",
        meaning: "集合的に乗組員",
        examples: [
            { id: 11401, sentence: "passengers and [crew] on the plane", translation: "飛行機の乗客と乗組員" },
            { id: 11402, sentence: "a camera [crew]", translation: "テレビカメラ班" }
        ]
    },
    {
        id: 1141,
        word: "chase",
        meaning: "〜を追いかける",
        examples: [
            { id: 11411, sentence: "Police [chased] the stolen car.", translation: "警察はその盗難車を追いかけた。" },
            { id: 11412, sentence: "After a long [chase], I finally caught the thief.", translation: "長い追跡の末、私はようやくその泥棒を捕まえた。" }
        ]
    },
    {
        id: 1142,
        word: "proceed",
        meaning: "順を追って〜する,さらに続けて〜する",
        examples: [
            { id: 11421, sentence: "First, please [proceed] to Gate 3.", translation: "まず、3番ゲートへお進みください。" },
            { id: 11422, sentence: "He took off his jacket and [proceeded] to untie his shoelaces.", translation: "彼は上着を脱ぎ、さらに靴ひもをゆるめた。" }
        ]
    },
    {
        id: 1143,
        word: "fade",
        meaning: "色や記憶などが薄れる",
        examples: [
            { id: 11431, sentence: "Childhood memories [fade] as time passes.", translation: "時が過ぎるとともに子どものころの記憶は薄れる。" }
        ]
    },
    {
        id: 1144,
        word: "dissolve",
        meaning: "溶ける,溶かす,国会などを解散する",
        examples: [
            { id: 11441, sentence: "Salt [dissolves] in hot water.", translation: "塩が熱湯に溶ける。" },
            { id: 11442, sentence: "[dissolve] salt in hot water", translation: "熱湯で塩を溶かす" },
            { id: 11443, sentence: "dissolve the Diet", translation: "国会を解散する" }
        ]
    },
    {
        id: 1145,
        word: "float",
        meaning: "浮かぶ,浮かべる",
        examples: [
            { id: 11451, sentence: "[float] on the sea", translation: "海面に浮かぶ" },
            { id: 11452, sentence: "[float] a raft on the river", translation: "川にいかだを浮かべる" }
        ]
    },
    {
        id: 1146,
        word: "sink",
        meaning: "沈む,〜を沈める,台所の流し",
        examples: [
            { id: 11461, sentence: "Oil does not [sink] in water.", translation: "油は水に沈まない。" },
            { id: 11462, sentence: "[sink] enemy ships", translation: "敵艦を沈める" },
            { id: 11463, sentence: "unwashed dishes in the [sink]", translation: "流しの中の洗っていない皿" }
        ]
    },
    {
        id: 1147,
        word: "bounce",
        meaning: "ボールなどが跳ねる,発元気不明で返送する",
        examples: [
            { id: 11471, sentence: "The ball [bounced] over the wall.", translation: "ボールは跳ねて壁を越えた。" },
            { id: 11472, sentence: "My email was [bounced] back.", translation: "私のメールが送り返されてきた。" }
        ]
    },
    {
        id: 1148,
        word: "transform",
        meaning: "〜を大いに変える,大いに変形する,変身する",
        examples: [
            { id: 11481, sentence: "[transform] the old house into a restaurant", translation: "古い家を改造してレストランにする" },
            { id: 11482, sentence: "This car can [transform] into a robot.", translation: "この車はロボットに変身できる。" }
        ]
    },
    {
        id: 1149,
        word: "shift",
        meaning: "考え方の転換,勤務の交替",
        examples: [
            { id: 11491, sentence: "a paradigm [shift]", translation: "パラダイムシフト（理論的枠組みの転換）" },
            { id: 11492, sentence: "work on the night [shift]", translation: "夜間（昼間）（交替）勤務で働く" }
        ]
    },
    {
        id: 1150,
        word: "modify",
        meaning: "〜を修正する",
        examples: [
            { id: 11501, sentence: "genetically [modified] (GM) foods", translation: "遺伝子組み換え（遺伝子上位修正された）食品" }
        ]
    },
    {
        id: 1151,
        word: "revise",
        meaning: "制度、予測、論文などを修正する,改訂する",
        examples: [
            { id: 11511, sentence: "[revise] the education system", translation: "教育制度を改正する" }
        ]
    },
    {
        id: 1152,
        word: "enhance",
        meaning: "質、評判などを高める",
        examples: [
            { id: 11521, sentence: "[enhance] my aesthetic sense", translation: "美意識を磨く（向上させる）" }
        ]
    },
    {
        id: 1153,
        word: "lower",
        meaning: "〜を下げる",
        examples: [
            { id: 11531, sentence: "[lower] the voting age from 20 to 18", translation: "選挙権年齢を20歳から18歳に引き下げる" }
        ]
    },
    {
        id: 1154,
        word: "voyage",
        meaning: "航海、船旅（通例、長い）船旅、宇宙の旅",
        examples: [
            { id: 11541, sentence: "make a [voyage] around the world", translation: "世界一周の船旅をする" }
        ]
    },
    {
        id: 1155,
        word: "confirm",
        meaning: "〜を確認する,〜を裏付ける",
        examples: [
            { id: 11551, sentence: "[confirm] the booking", translation: "予約を確認する" },
            { id: 11552, sentence: "[confirm] his theory", translation: "彼の理論を裏付ける" }
        ]
    },
    {
        id: 1156,
        word: "ensure",
        meaning: "〜を確実にする",
        examples: [
            { id: 11561, sentence: "Please [ensure] that you leave. [= will leave] nothing behind.", translation: "忘れ物をしないように気をつけて（確実に）ください。" }
        ]
    },
    {
        id: 1157,
        word: "address",
        meaning: "気持ち、言葉、手紙を〜に向けて出す,演説,住所",
        examples: [
            { id: 11571, sentence: "[address] an environmental problem", translation: "環境問題に取り組む" },
            { id: 11572, sentence: "[address] the nation", translation: "国民に呼びかける" },
            { id: 11573, sentence: "an opening [address]", translation: "開会の辞（演説）" },
            { id: 11574, sentence: "the sender's [address]", translation: "差出人の住所" }
        ]
    },
    {
        id: 1158,
        word: "approach",
        meaning: "空間（時間）的に近づく,接近,〜にどう取り組むか、接近する",
        examples: [
            { id: 11581, sentence: "a new [approach] to teaching languages", translation: "言語教育への新たな取り組み方" },
            { id: 11582, sentence: "[approach] the problem carefully", translation: "その問題に慎重に取り組む" }
        ]
    },
    {
        id: 1159,
        word: "resolve",
        meaning: "〜を解決する,do (〜する) 決心をする",
        examples: [
            { id: 11591, sentence: "[resolve] the problem on my own", translation: "自分でその問題を解決する" },
            { id: 11592, sentence: "After his divorce, he [resolved] to remain single for the rest of his life.", translation: "彼は離婚後、一生独身でいる決心をした。" }
        ]
    },
    {
        id: 1160,
        word: "settle",
        meaning: "紛争などを解決する,〜を置く,据える,定住する,on (〜を) 決める",
        examples: [
            { id: 11601, sentence: "[settle] the dispute", translation: "その紛争を解決する" },
            { id: 11602, sentence: "[settle] a bag on my shoulder", translation: "バッグを肩にかける（置く）" },
            { id: 11603, sentence: "[settle] (down) in Brazil", translation: "ブラジルに定住する" },
            { id: 11604, sentence: "[settle] on a name for our new dog", translation: "私たちの新しいイヌの名前を決める" }
        ]
    },
    {
        id: 1161,
        word: "enrich",
        meaning: "〜を豊かにする,何かを加えて質を上げる",
        examples: [
            { id: 11611, sentence: "[enrich] the soil", translation: "その土壌を豊かにする" }
        ]
    },
    {
        id: 1162,
        word: "warn",
        meaning: "〜に警告する,of (against) 〜に対して警告する",
        examples: [
            { id: 11621, sentence: "[warn] him to follow the rules", translation: "規則に従うように警告する" },
            { id: 11622, sentence: "[warn] of global warming", translation: "地球温暖化を警告する" }
        ]
    },
    {
        id: 1163,
        word: "force",
        meaning: "〜に強いる,力,武力,無理矢理〜させる",
        examples: [
            { id: 11631, sentence: "The older kids [forced] him to shoplift.", translation: "年上の子たちが彼に万引きするよう強いた。" },
            { id: 11632, sentence: "the [forces] of nature", translation: "自然の（種々の）力" }
        ]
    },
    {
        id: 1164,
        word: "appeal",
        meaning: "to (〜に) 訴える,魅力,人気,for (〜に) 対する訴え,感情などに訴えかける",
        examples: [
            { id: 11641, sentence: "[appeal] to our emotions", translation: "私たちの感情に訴えかける" },
            { id: 11642, sentence: "have a wide [appeal] among young people", translation: "若者に幅広い人気がある" },
            { id: 11643, sentence: "a UN [appeal] for a ceasefire", translation: "国連による停戦の訴え" }
        ]
    },
    {
        id: 1165,
        word: "applause",
        meaning: "拍手（不可算）",
        examples: [
            { id: 11651, sentence: "receive hearty [applause]", translation: "心からの拍手をもらう" }
        ]
    },
    {
        id: 1166,
        word: "leap",
        meaning: "跳ぶ,跳躍,急増",
        examples: [
            { id: 11661, sentence: "A fish [leapt] out of a pond.", translation: "魚が池の中から飛び出た。" },
            { id: 11662, sentence: "by [leaps] and bounds", translation: "飛躍的に" }
        ]
    },
    {
        id: 1167,
        word: "grab",
        meaning: "ぐいっと〜をつかむ,急いで食事、睡眠をとる",
        examples: [
            { id: 11671, sentence: "[grab] him by the neck", translation: "彼の首根っこをつかむ" },
            { id: 11672, sentence: "[grab] a hamburger for lunch", translation: "昼食にハンバーガーをさっと食べる" }
        ]
    },
    {
        id: 1168,
        word: "seize",
        meaning: "〜をつかむ,麻薬などを押収する,犯人を捕らええる",
        examples: [
            { id: 11681, sentence: "[seize] her by the shoulder", translation: "彼女の肩をつかむ" },
            { id: 11682, sentence: "[seize] drugs", translation: "麻薬を押収する" }
        ]
    },
    {
        id: 1169,
        word: "cast",
        meaning: "具体的な物を投げる,抽象的な事象を投げかける,役を与える",
        examples: [
            { id: 11691, sentence: "[cast] a net around a school of tuna", translation: "マグロの群れに網を投げ入れる" },
            { id: 11692, sentence: "[cast] a new light on the problem", translation: "その問題に新たな光を投げかける" },
            { id: 11693, sentence: "[cast] him in the part of Romeo", translation: "彼にロミオの役を与える" }
        ]
    },
    {
        id: 1170,
        word: "stun",
        meaning: "〜を気絶させる,〜をほう然とさせる",
        examples: [
            { id: 11701, sentence: "[stun] him with a blow", translation: "殴って彼を気絶させる" },
            { id: 11702, sentence: "be [stunned] at [by] the news", translation: "その知らせを聞いてほう然とする" }
        ]
    },
    {
        id: 1171,
        word: "illuminate",
        meaning: "〜を照らす,問題を解明する",
        examples: [
            { id: 11711, sentence: "a beautifully [illuminated] castle", translation: "美しく照らされた城" },
            { id: 11712, sentence: "[illuminate] the difficult issue", translation: "その難しい問題を解明する" }
        ]
    },
    {
        id: 1172,
        word: "uncover",
        meaning: "〜を明らかにする、暴く",
        examples: [
            { id: 11721, sentence: "[uncover] a scandal", translation: "不祥事を暴く" }
        ]
    },
    {
        id: 1173,
        word: "mend",
        meaning: "〜を修繕する",
        examples: [
            { id: 11731, sentence: "[mend] a tear in my jacket", translation: "上着のほころびを修繕する" }
        ]
    },
    {
        id: 1174,
        word: "react",
        meaning: "to (〜に) 反応する",
        examples: [
            { id: 11741, sentence: "[react] angrily to the news", translation: "その知らせに怒りの反応を示す（怒って反応する）" }
        ]
    },
    {
        id: 1175,
        word: "endure",
        meaning: "長期にわたり〜に耐える",
        examples: [
            { id: 11751, sentence: "[endure] years of suffering", translation: "長年の苦労に耐える" }
        ]
    },
    {
        id: 1176,
        word: "bind",
        meaning: "〜を結びつける,縛る",
        examples: [
            { id: 11761, sentence: "[bind] two communities together", translation: "2つの社会を結びつける" }
        ]
    },
    {
        id: 1177,
        word: "encounter",
        meaning: "予想せぬ人と出会う,問題、反対などに遭う",
        examples: [
            { id: 11771, sentence: "[encounter] a bear in the woods", translation: "森の中でクマに遭遇する" },
            { id: 11772, sentence: "[encounter] serious problems", translation: "深刻な問題にぶつかる" },
            { id: 11773, sentence: "my first [encounter] with her", translation: "私と彼女の最初の出会い" }
        ]
    },
    {
        id: 1178,
        word: "trace",
        meaning: "犯人などを追跡して見つける,歴史をさかのぼる,微粒子跡",
        examples: [
            { id: 11781, sentence: "[trace] a missing person", translation: "行方不明の人を捜し出す" },
            { id: 11782, sentence: "[trace] my family tree back 100 years", translation: "家族の系譜を100年さかのぼる" },
            { id: 11783, sentence: "disappear without [trace]", translation: "跡形もなく消える" }
        ]
    },
    {
        id: 1179,
        word: "undergo",
        meaning: "不快なことを経験する,手術などを受ける",
        examples: [
            { id: 11791, sentence: "[undergo] cosmetic surgery", translation: "美容整形手術を受ける" }
        ]
    },
    {
        id: 1180,
        word: "incorporate",
        meaning: "全体の一部とする,取り入れる",
        examples: [
            { id: 11801, sentence: "Many words have been [incorporated] into English from Latin.", translation: "多くの単語がラテン語から英語に取り入れられた。" }
        ]
    },
    {
        id: 1181,
        word: "seal",
        meaning: "〜を密封する,印鑑,ハンコ",
        examples: [
            { id: 11811, sentence: "a [sealed] container", translation: "密閉容器" },
            { id: 11812, sentence: "Could you put your personal [seal] here?", translation: "ここに捺印していただけますか。" }
        ]
    },
    {
        id: 1182,
        word: "emerge",
        meaning: "隠れていたものが現れる,国家などが台頭する",
        examples: [
            { id: 11821, sentence: "[emerge] from the darkness", translation: "暗闇から現れる" },
            { id: 11822, sentence: "Japan [emerged] as a modern state.", translation: "日本は近代国家として台頭した。" }
        ]
    },
    {
        id: 1183,
        word: "unfold",
        meaning: "展開する,はっきりしてくる,地図を広げる",
        examples: [
            { id: 11831, sentence: "How will that drama [unfold]?", translation: "そのドラマはどのように展開するのだろう。" },
            { id: 11832, sentence: "[unfold] a map", translation: "地図を広げる" }
        ]
    },
    {
        id: 1184,
        word: "derive",
        meaning: "from (〜に) 由来する,〜を引き出す、得る",
        examples: [
            { id: 11841, sentence: "This word [derives] from Latin.", translation: "この単語はラテン語に由来する。" },
            { id: 11842, sentence: "[derive] pleasure from reading", translation: "読書から楽しみを得る" }
        ]
    },
    {
        id: 1185,
        word: "generate",
        meaning: "電気、利益などを生み出す",
        examples: [
            { id: 11851, sentence: "[generate] electricity", translation: "電気を生み出す" }
        ]
    },
    {
        id: 1186,
        word: "possess",
        meaning: "〜を所有している,貴重なもの、才能などを持っている",
        examples: [
            { id: 11861, sentence: "Every child [possesses] a range of abilities.", translation: "どの子も多彩な才能を所有している。" }
        ]
    },
    {
        id: 1187,
        word: "retain",
        meaning: "〜を保持する",
        examples: [
            { id: 11871, sentence: "[retain] her beauty", translation: "彼女の美しさを保持する" }
        ]
    },
    {
        id: 1188,
        word: "secure",
        meaning: "場所、地位などを確保する,安全な,守られて",
        examples: [
            { id: 11881, sentence: "[secure] a window seat", translation: "窓側の席を確保する" },
            { id: 11882, sentence: "feel [secure] about the future", translation: "将来に対して安心感をもつ" }
        ]
    },
    {
        id: 1189,
        word: "capture",
        meaning: "〜を捕らえる,捕獲,陣地の攻略",
        examples: [
            { id: 11891, sentence: "The monkey that escaped from the zoo was [captured].", translation: "動物園から逃げたサルが捕獲された。" },
            { id: 11892, sentence: "avoid [capture]", translation: "逮捕を逃れる" }
        ]
    },
    {
        id: 1190,
        word: "monitor",
        meaning: "〜を監視する,コンピュータの画面",
        examples: [
            { id: 11901, sentence: "[monitor] my blood pressure", translation: "（一定期間）血圧をチェックする" },
            { id: 11902, sentence: "a high-resolution [monitor]", translation: "高解像度のモニター" }
        ]
    },
    {
        id: 1191,
        word: "investigate",
        meaning: "研究などを調査する,警察が〜を捜査する",
        examples: [
            { id: 11911, sentence: "[investigate] the ecology of eels", translation: "ウナギの生態を調査する" },
            { id: 11912, sentence: "[investigate] the murder case", translation: "その殺人事件を捜査する" }
        ]
    },
    {
        id: 1192,
        word: "detect",
        meaning: "〜を探知する,病気などを発見する,見抜く",
        examples: [
            { id: 11921, sentence: "[detect] a small amount of drug", translation: "微量の麻薬を検出する" }
        ]
    },
    {
        id: 1193,
        word: "inquire",
        meaning: "into (〜を) 調査,質問,問い合わせ",
        examples: [
            { id: 11931, sentence: "an [inquiry] into his background", translation: "彼の身元調査" },
            { id: 11932, sentence: "receive [inquiries] from several companies", translation: "いくつかの会社から問い合わせがある" }
        ]
    },
    {
        id: 1194,
        word: "specialize",
        meaning: "in (英) を専攻する, (米) を専門にする",
        examples: [
            { id: 11941, sentence: "[specialize] in business administration", translation: "経営学を専攻する" },
            { id: 11942, sentence: "[specialize] in imported groceries", translation: "輸入食料雑貨商品を専門に扱う" }
        ]
    },
    {
        id: 1195,
        word: "semester",
        meaning: "米、日本などの2学期制の学期,3学期制の場合はterm",
        examples: [
            { id: 11951, sentence: "the first [semester]", translation: "前期" },
            { id: 11952, sentence: "the second [semester]", translation: "後期" }
        ]
    },
    {
        id: 1196,
        word: "biology",
        meaning: "生物学,生物や生命現象を研究する学問",
        examples: [
            { id: 11961, sentence: "Biology is the scientific study of living things.", translation: "生物学は生物の科学的な研究です。" }
        ]
    },
    {
        id: 1197,
        word: "ecology",
        meaning: "生態学",
        examples: [
            { id: 11971, sentence: "the [ecology] of jellyfish", translation: "クラゲの生態" }
        ]
    },
    {
        id: 1198,
        word: "philosophy",
        meaning: "学問としての哲学（不可算）,人生哲学、考え方（可算）",
        examples: [
            { id: 11981, sentence: "the [philosophy] of Aristotle", translation: "アリストテレスの哲学" },
            { id: 11982, sentence: "my [philosophy] of life", translation: "私の人生哲学" }
        ]
    },
    {
        id: 1199,
        word: "geography",
        meaning: "地理学,まれに地形、配置の意味でも使う",
        examples: [
            { id: 11991, sentence: "a great discovery in [geography]", translation: "地理上の偉大な発見" }
        ]
    },
    {
        id: 1200,
        word: "institution",
        meaning: "大学、病院などの機関,結婚などの制度",
        examples: [
            { id: 12001, sentence: "educational [institutions]", translation: "教育機関" },
            { id: 12002, sentence: "social [institutions] such as marriage", translation: "結婚などの社会制度" }
        ]
    },
    {
        id: 1201,
        word: "faculty",
        meaning: "生まれ持った能力,大学の学部,大学の全教員",
        examples: [
            { id: 12011, sentence: "the [faculty] of hearing", translation: "聴力" },
            { id: 12012, sentence: "the Faculty of Engineering", translation: "工学部" },
            { id: 12013, sentence: "a [faculty] meeting", translation: "教授会" }
        ]
    },
    {
        id: 1202,
        word: "intermediate",
        meaning: "授業、教材が中級の,中間ぎの",
        examples: [
            { id: 12021, sentence: "an [intermediate] [× middle] course", translation: "中級の講座" },
            { id: 12022, sentence: "Gray is [intermediate] between black and white.", translation: "灰色は黒と白の中間だ。" }
        ]
    },
    {
        id: 1203,
        word: "notion",
        meaning: "考え,論文では「概念、観念」の意味で使用",
        examples: [
            { id: 12031, sentence: "the [notion] that smoking is cool", translation: "タバコを吸うのは格好いいという考え" }
        ]
    },
    {
        id: 1204,
        word: "concept",
        meaning: "概念、考え",
        examples: [
            { id: 12041, sentence: "the [concept] of time", translation: "時間の概念" }
        ]
    },
    {
        id: 1205,
        word: "meditation",
        meaning: "瞑想,黙考,リラックスのための、あるいは宗教上の瞑想",
        examples: [
            { id: 12051, sentence: "sit in Zen [meditation]", translation: "座禅（座って行う瞑想）を組む" },
            { id: 12052, sentence: "[meditation] on my life", translation: "人生についての熟考" }
        ]
    },
    {
        id: 1206,
        word: "insight",
        meaning: "物事の内面を見抜く,洞察（力）,見識",
        examples: [
            { id: 12061, sentence: "an [insight] into human nature", translation: "人間性への洞察" },
            { id: 12062, sentence: "a woman of great [insight]", translation: "見識の高い女性" }
        ]
    },
    {
        id: 1207,
        word: "caution",
        meaning: "用心,警告,3に注意（警告）を与える",
        examples: [
            { id: 12071, sentence: "act with [caution]", translation: "用心して行動する" },
            { id: 12072, sentence: "Caution! Roadworks!", translation: "注意！道路工事中！" },
            { id: 12073, sentence: "The coach [cautioned] all the players.", translation: "監督は全選手に注意を与えた。" }
        ]
    },
    {
        id: 1208,
        word: "will",
        meaning: "意志,遺言,助動詞will（〜するつもりだ）と同系語",
        examples: [
            { id: 12081, sentence: "against my [will]", translation: "意志に反して" },
            { id: 12082, sentence: "make a [will]", translation: "遺言を作成する" }
        ]
    },
    {
        id: 1209,
        word: "option",
        meaning: "選択肢,選択の自由",
        examples: [
            { id: 12091, sentence: "consider other [options]", translation: "ほかの選択肢を考える" }
        ]
    },
    {
        id: 1210,
        word: "prospect",
        meaning: "見通し,将来の主観的な見通し",
        examples: [
            { id: 12101, sentence: "I was both excited and worried at the [prospect] of becoming a father.", translation: "自分が父親になることを考えるとうれしくないと同時に不安だった。" }
        ]
    },
    {
        id: 1211,
        word: "cherish",
        meaning: "〜を大切にする,胸に抱く",
        examples: [
            { id: 12111, sentence: "[cherish] the memories of that day", translation: "その日の思い出を大切にする" }
        ]
    },
    {
        id: 1212,
        word: "intend",
        meaning: "to do 〜するつもりだ",
        examples: [
            { id: 12121, sentence: "[Intend] to see the movie", translation: "その映画を見るつもりだ" }
        ]
    },
    {
        id: 1213,
        word: "suspect",
        meaning: "that SVではないかと思う,容疑者",
        examples: [
            { id: 12131, sentence: "The police [suspect] that she stole the money.", translation: "警察は彼女がそのお金を盗んだのではないかと思っている。" },
            { id: 12132, sentence: "We [suspect] that man.", translation: "あの男が怪しいと思っている。" },
            { id: 12133, sentence: "the prime [suspect]", translation: "有力な容疑者" }
        ]
    },
    {
        id: 1214,
        word: "identify",
        meaning: "〜を特定する,生物を同定する,A with B（AとB）と同一視する",
        examples: [
            { id: 12141, sentence: "[identify] the fingerprints", translation: "その指紋を特定する" },
            { id: 12142, sentence: "Never [identify] happiness with money.", translation: "幸福を金と同一視するな。" },
            { id: 12143, sentence: "[identify] with that character", translation: "そのキャラクターになりきる" }
        ]
    },
    {
        id: 1215,
        word: "permit",
        meaning: "〜を許可する,許可証",
        examples: [
            { id: 12151, sentence: "Parking is not [permitted] here.", translation: "ここでは駐車は許可されていません。" },
            { id: 12152, sentence: "a work [permit]", translation: "就業許可証" }
        ]
    },
    {
        id: 1216,
        word: "acknowledge",
        meaning: "悪事の事実を認める,〜を認める",
        examples: [
            { id: 12161, sentence: "[acknowledge] the need for change", translation: "変化の必要性を認める" }
        ]
    },
    {
        id: 1217,
        word: "perceive",
        meaning: "A as B（AをBだ）と認識する,〜を知覚する",
        examples: [
            { id: 12171, sentence: "[perceive] the discovery as a major breakthrough", translation: "その発見を飛躍的進歩と認識する" },
            { id: 12172, sentence: "[perceive] a change in his expression", translation: "彼の表情の変化に気づく" }
        ]
    }
    
];

class WordManager {
    constructor() {
        this.storageKey = 'vocab_app_data_v16';
        this.words = this.loadData();
    }

    loadData() {
        const saved = localStorage.getItem(this.storageKey);
        let data = DEFAULT_WORDS;
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    data = parsed;
                }
            } catch (e) {
                console.error("Failed to parse localStorage", e);
            }
        }
        
        data.forEach(w => {
            if (!w.wordStats) {
                w.wordStats = {
                    'choice-en-to-jp': { correctCount: 0, incorrectCount: 0 },
                    'choice-jp-to-en': { correctCount: 0, incorrectCount: 0 },
                    'jp-to-en': { correctCount: 0, incorrectCount: 0 }
                };
            }
            if (w.examples) {
                w.examples.forEach(ex => {
                    if (!ex.stats) ex.stats = {};
                    if (!ex.stats['fill']) {
                        const oldC = ex.correctCount || 0;
                        const oldInc = ex.incorrectCount || 0;
                        ex.stats['fill'] = { correctCount: oldC, incorrectCount: oldInc };
                    }
                    delete ex.correctCount;
                    delete ex.incorrectCount;
                });
            }
        });

        return data.sort((a, b) => a.id - b.id);
    }

    saveData() {
        this.words.sort((a, b) => a.id - b.id);
        localStorage.setItem(this.storageKey, JSON.stringify(this.words));
    }

    getWords() {
        return this.words;
    }

    addWord(wordData) {
        const maxId = this.words.length > 0 ? Math.max(...this.words.map(w => w.id)) : 1000;
        wordData.id = maxId >= 1000 ? maxId + 1 : 1001;
        
        wordData.wordStats = {
            'choice-en-to-jp': { correctCount: 0, incorrectCount: 0 },
            'choice-jp-to-en': { correctCount: 0, incorrectCount: 0 },
            'jp-to-en': { correctCount: 0, incorrectCount: 0 }
        };

        wordData.examples = (wordData.examples || []).map((ex, index) => ({
            id: wordData.id * 10 + (index + 1),
            sentence: ex.sentence,
            translation: ex.translation,
            stats: {
                'fill': { correctCount: 0, incorrectCount: 0 }
            }
        }));

        this.words.push(wordData);
        this.saveData();
    }

    updateWord(id, updatedData) {
        const index = this.words.findIndex(w => w.id === id);
        if (index !== -1) {
            const oldWord = this.words[index];
            updatedData.wordStats = oldWord.wordStats || {
                'choice-en-to-jp': { correctCount: 0, incorrectCount: 0 },
                'choice-jp-to-en': { correctCount: 0, incorrectCount: 0 },
                'jp-to-en': { correctCount: 0, incorrectCount: 0 }
            };

            updatedData.examples = (updatedData.examples || []).map((ex, i) => {
                const matchedOldEx = oldWord.examples && oldWord.examples.find(oe => oe.sentence === ex.sentence);
                return {
                    id: matchedOldEx ? matchedOldEx.id : updatedData.id * 10 + (i + 1),
                    sentence: ex.sentence,
                    translation: ex.translation,
                    stats: matchedOldEx && matchedOldEx.stats ? matchedOldEx.stats : {
                        'fill': { correctCount: 0, incorrectCount: 0 }
                    }
                };
            });
            this.words[index] = updatedData;
            this.saveData();
        }
    }

    deleteWord(id) {
        this.words = this.words.filter(w => w.id !== id);
        this.saveData();
    }

    updateStats(targetId, isCorrect, testMode) {
        for (let word of this.words) {
            if (testMode === 'fill') {
                if (!word.examples) continue;
                for (let ex of word.examples) {
                    if (ex.id === targetId) {
                        if (!ex.stats) ex.stats = {};
                        if (!ex.stats['fill']) ex.stats['fill'] = { correctCount: 0, incorrectCount: 0 };
                        
                        if (isCorrect) ex.stats['fill'].correctCount++;
                        else ex.stats['fill'].incorrectCount++;
                        
                        this.saveData();
                        return;
                    }
                }
            } else {
                if (word.id === targetId) {
                    if (!word.wordStats) {
                        word.wordStats = {
                            'choice-en-to-jp': { correctCount: 0, incorrectCount: 0 },
                            'choice-jp-to-en': { correctCount: 0, incorrectCount: 0 },
                            'jp-to-en': { correctCount: 0, incorrectCount: 0 }
                        };
                    }
                    if (!word.wordStats[testMode]) {
                        word.wordStats[testMode] = { correctCount: 0, incorrectCount: 0 };
                    }

                    if (isCorrect) word.wordStats[testMode].correctCount++;
                    else word.wordStats[testMode].incorrectCount++;

                    this.saveData();
                    return;
                }
            }
        }
    }

    resetAllStats() {
        for (let word of this.words) {
            if (word.wordStats) {
                Object.keys(word.wordStats).forEach(mode => {
                    word.wordStats[mode].correctCount = 0;
                    word.wordStats[mode].incorrectCount = 0;
                });
            }
            if (word.examples) {
                word.examples.forEach(ex => {
                    if (ex.stats && ex.stats['fill']) {
                        ex.stats['fill'].correctCount = 0;
                        ex.stats['fill'].incorrectCount = 0;
                    }
                });
            }
        }
        this.saveData();
    }
}

window.wordManager = new WordManager();
