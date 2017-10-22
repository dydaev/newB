<?php

namespace RomaChe\NewsBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use RomaChe\AuthBundle\Helpers\ChmodInterface;
use Doctrine\Common\Collections\ArrayCollection;


/**
 * News
 *
 * @ORM\Entity
 */
class News implements ChmodInterface
{
    public function __construct()
    {
        $this->tags = new ArrayCollection();
        $this->coments = new ArrayCollection();
        $this->createdAt = new \DateTime();
        $this->type = 'NEWS';
    }
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="type", type="string", length=255)
     */
    private $type;

    /**
     * @var string
     *
     * @ORM\Column(name="title", type="string", length=255, nullable=true)
     */
    private $title;

    /**
     * @var string
     *
     * @ORM\Column(name="img", type="text", length=65535, nullable=true)
     */
    private $img;

    /**
     * @var string
     *
     * @ORM\Column(name="announce", type="text", length=65535, nullable=true)
     */
    private $announce;

    /**
     * @var string
     *
     * @ORM\Column(name="text", type="text", length=65535, nullable=true)
     */
    private $text;

    /**
     * @var integer
     *
     * @ORM\Column(name="author", type="integer", nullable=false)
     */
    private $author;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="pub_date", type="date", nullable=true)
     */
    private $pubDate;

    /**
     * @var \Theme
     *
     * @ORM\ManyToOne(targetEntity="Theme", inversedBy="newses")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="theme_id", referencedColumnName="id")
     * })
     */
    private $theme;

    /**
     * @ORM\ManyToMany(targetEntity="Tag", inversedBy="newses")
     * @ORM\JoinTable(name="newses_tags")
     */
    private $tags;

    /**
     * One Product has One Shipment.
     * @ORM\OneToOne(targetEntity="Chmod")
     * @ORM\JoinColumn(name="chmod_id", referencedColumnName="id")
     */
    private $chmod;

    /**
     * One News has Many Comments.
     * @ORM\OneToMany(targetEntity="Comment", mappedBy="product")
     */
    private $coments;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="createdAt", type="datetime")
     */
    private $createdAt;

    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set title
     *
     * @param string $title
     *
     * @return News
     */
    public function setTitle($title)
    {
        $this->title = $title;

        return $this;
    }
    /**
     * Get title
     *
     * @return string
     */
    public function getName()
    {
        return $this->title;
    }

    /**
     * Get title
     *
     * @return string
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Set img
     *
     * @param string $img
     *
     * @return News
     */
    public function setImg($img)
    {
        $this->img = $img;

        return $this;
    }

    /**
     * Get img
     *
     * @return string
     */
    public function getImg()
    {
        return $this->img;
    }

    /**
     * Set announce
     *
     * @param string $announce
     *
     * @return News
     */
    public function setAnnounce($announce)
    {
        $this->announce = $announce;

        return $this;
    }

    /**
     * Get announce
     *
     * @return string
     */
    public function getAnnounce()
    {
        return $this->announce;
    }

    /**
     * Set text
     *
     * @param string $text
     *
     * @return News
     */
    public function setText($text)
    {
        $this->text = $text;

        return $this;
    }

    /**
     * Get text
     *
     * @return string
     */
    public function getText()
    {
        return $this->text;
    }

    /**
     * Set author
     *
     * @param integer $author
     *
     * @return News
     */
    public function setAuthor($author)
    {
        $this->author = $author;

        return $this;
    }

    /**
     * Get author
     *
     * @return integer
     */
    public function getAuthor()
    {
        return $this->author;
    }

    /**
     * Set pubDate
     *
     * @param \DateTime $pubDate
     *
     * @return News
     */
    public function setPubDate($pubDate)
    {
        $this->pubDate = $pubDate;

        return $this;
    }

    /**
     * Get pubDate
     *
     * @return \DateTime
     */
    public function getPubDate()
    {
        return $this->pubDate;
    }

    /**
     * Set createdAt
     *
     * @param \DateTime $createdAt
     *
     * @return News
     */
    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    /**
     * Get createdAt
     *
     * @return \DateTime
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    /**
     * Set chmod
     *
     * @param \RomaChe\NewsBundle\Entity\Chmod $chmod
     *
     * @return News
     */
    public function setChmod(\RomaChe\NewsBundle\Entity\Chmod $chmod = null)
    {
        $this->chmod = $chmod;

        return $this;
    }

    /**
     * Get chmod
     *
     * @return \RomaChe\NewsBundle\Entity\Chmod
     */
    public function getChmod()
    {
        return $this->chmod;
    }

    /**
     * Set type
     *
     * @param string $type
     *
     * @return News
     */
    public function setType($type)
    {
        $this->type = $type;

        return $this;
    }

    /**
     * Get type
     *
     * @return string
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * Set theme
     *
     * @param \RomaChe\NewsBundle\Entity\Theme $theme
     *
     * @return News
     */
    public function setTheme(\RomaChe\NewsBundle\Entity\Theme $theme = null)
    {
        $this->theme = $theme;

        return $this;
    }

    /**
     * Get theme
     *
     * @return \RomaChe\NewsBundle\Entity\Theme
     */
    public function getTheme()
    {
        return $this->theme;
    }

    /**
     * Add tag
     *
     * @param \RomaChe\NewsBundle\Entity\Tag $tag
     *
     * @return News
     */
    public function addTag(\RomaChe\NewsBundle\Entity\Tag $tag)
    {
        $this->tags[] = $tag;

        return $this;
    }

    /**
     * Remove tag
     *
     * @param \RomaChe\NewsBundle\Entity\Tag $tag
     */
    public function removeTag(\RomaChe\NewsBundle\Entity\Tag $tag)
    {
        $this->tags->removeElement($tag);
    }

    /**
     * Get tags
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getTags()
    {
        return $this->tags;
    }


    /**
     * Add coment
     *
     * @param \RomaChe\NewsBundle\Entity\Comment $coment
     *
     * @return News
     */
    public function addComent(\RomaChe\NewsBundle\Entity\Comment $coment)
    {
        $this->coments[] = $coment;

        return $this;
    }

    /**
     * Remove coment
     *
     * @param \RomaChe\NewsBundle\Entity\Comment $coment
     */
    public function removeComent(\RomaChe\NewsBundle\Entity\Comment $coment)
    {
        $this->coments->removeElement($coment);
    }

    /**
     * Get coments
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getComents()
    {
        return $this->coments;
    }
}
